"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  UploadCloud,
  X,
  File as FileIcon,
  CheckCircle2,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { GalleryService, Media } from "@/services/gallery.service";

interface BatchUploadProps {
  albumId: string;
  existingMedia?: Media[];
  onUploadComplete?: (newMedia: Media[]) => void;
}

interface UploadTask {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  previewUrl: string;
}

export default function BatchUpload({
  albumId,
  existingMedia = [],
  onUploadComplete,
}: BatchUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<Media[]>(existingMedia);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    // 1. Create task items for UI
    const newTasks: UploadTask[] = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: "pending",
      previewUrl: URL.createObjectURL(file),
    }));

    setTasks((prev) => [...prev, ...newTasks]);

    // 2. Start batch upload via service
    const uploaded = await GalleryService.uploadBatchMedia(
      albumId,
      files,
      (progress: number, index: number) => {
        // Update progress for the specific file
        setTasks((currentTasks) => {
          const updated = [...currentTasks];
          const targetTask = newTasks[index];
          if (!targetTask) return updated;

          const taskIndex = updated.findIndex((t) => t.id === targetTask.id);
          if (taskIndex !== -1 && updated[taskIndex]) {
            updated[taskIndex] = {
              ...updated[taskIndex],
              progress,
              status: progress >= 100 ? "success" : "uploading",
            } as UploadTask;
          }
          return updated;
        });
      },
    );

    // 3. Mark all corresponding tasks as complete properly (just to be sure if some didn't hit 100 via progress callback)
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        const isNewTask = newTasks.some((nt) => nt.id === task.id);
        if (isNewTask && task.status !== "success") {
          return { ...task, progress: 100, status: "success" };
        }
        return task;
      });
    });

    if (uploaded.length > 0) {
      setUploadedMedia((prev) => [...prev, ...uploaded]);
      if (onUploadComplete) onUploadComplete(uploaded);
    }
  };

  const removeTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm("Bạn có chắc muốn xóa ảnh này?")) return;
    try {
      await GalleryService.deleteMedia(mediaId);
      setUploadedMedia((prev) => prev.filter((m) => m.id !== mediaId));
    } catch (error) {
      console.error("Failed to delete media", error);
      alert("Không thể xóa ảnh. Vui lòng thử lại.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Zone */}
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
            : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInput}
        />
        <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 mb-4">
          <UploadCloud className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-base font-medium text-slate-700 dark:text-slate-300 mb-1">
          Kéo thả ảnh/video vào khu vực này
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center max-w-xs">
          Hỗ trợ tải lên hàng loạt không giới hạn. Tối đa 20MB / file.
        </p>
        <button className="rounded-md bg-white dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition">
          Chọn file từ máy tính
        </button>
      </div>

      {/* Uploading Tasks List View */}
      {tasks.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            Tiến trình tải lên (
            {tasks.filter((t) => t.status === "success").length}/{tasks.length})
          </h4>
          <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="h-10 w-10 flex-shrink-0 rounded bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    {task.file.type.startsWith("image/") ? (
                      <img
                        src={task.previewUrl}
                        alt="preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <FileIcon className="h-5 w-5 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {task.file.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {(task.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                  {task.status === "uploading" || task.status === "pending" ? (
                    <div className="w-24">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 font-medium">
                          Đang tải...
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">
                          {task.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : task.status === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}

                  <button
                    onClick={() => removeTask(task.id)}
                    className="p-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Gallery Grid */}
      {uploadedMedia.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Hình ảnh trong Album
          </h4>
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {uploadedMedia.map((media) => (
              <div
                key={media.id}
                className="group relative aspect-square rounded-md overflow-hidden bg-slate-200 dark:bg-slate-700"
              >
                {media.category === "IMAGE" ? (
                  <img
                    src={media.url}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                    alt={media.fileName}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <FileIcon className="h-8 w-8 text-slate-400 mb-2" />
                    <span className="text-xs text-slate-500 text-center px-2 truncate w-full">
                      {media.fileName}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleDeleteMedia(media.id)}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transform scale-50 group-hover:scale-100 transition duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface EditorJSWrapperProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
}

export default function EditorJSWrapper({
  value,
  onChange,
  placeholder = "Viết nội dung bài viết ở đây...",
}: EditorJSWrapperProps) {
  const editorRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Tải EditorJS & Plugins qua CDN (tuần tự: core trước, plugins sau)
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.31.3/dist/editorjs.umd.min.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/header@latest/dist/bundle.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/list@latest/dist/bundle.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/quote@latest/dist/bundle.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/embed@latest/dist/bundle.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/image@latest/dist/bundle.js",
    ];

    let cancelled = false;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => resolve(); // resolve anyway
        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      for (const src of scripts) {
        if (cancelled) return;
        await loadScript(src);
      }
      if (!cancelled) {
        setIsReady(true);
      }
    };

    loadAllScripts();

    return () => {
      cancelled = true;
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isReady && !editorRef.current) {
      // @ts-ignore
      const EditorJSModule = window.EditorJS;
      const EditorJS = EditorJSModule?.default || EditorJSModule;

      if (typeof EditorJS !== "function") return;

      const editorData =
        typeof value === "string" && value.length > 0
          ? JSON.parse(value)
          : value;

      // Image uploader: gọi API upload, trả về URL từ MinIO
      const imageUploader = {
        uploadByFile: async (file: File) => {
          const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch(`${API_URL}/api/media/upload`, {
            method: "POST",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: formData,
          });
          if (!res.ok) return { success: 0 };
          const data = await res.json();
          const url = data?.data?.url || "";
          // Nếu là relative path (/media_storage/...) thì giữ nguyên, browser tự resolve
          return { success: 1, file: { url } };
        },
        uploadByUrl: async (url: string) => {
          // URL từ CDN/internet — dùng thẳng không cần re-upload
          return { success: 1, file: { url } };
        },
      };

      const config: any = {
        holder: "editorjs",
        placeholder: placeholder,
        tools: {
          // @ts-ignore
          ...(window.Header ? { header: { class: window.Header } } : {}),
          // @ts-ignore
          ...(window.List ? { list: { class: window.List, inlineToolbar: true } } : {}),
          // @ts-ignore
          ...(window.Quote ? { quote: { class: window.Quote, config: { quotePlaceholder: "Trích dẫn...", captionPlaceholder: "Nguồn trích dẫn" } } } : {}),
          // @ts-ignore
          ...(window.Embed ? { embed: { class: window.Embed } } : {}),
          // @ts-ignore
          ...(window.ImageTool ? {
            image: {
              // @ts-ignore
              class: window.ImageTool,
              config: {
                uploader: imageUploader,
                captionPlaceholder: "Chú thích ảnh (ghi nguồn nếu có)...",
                buttonContent: "Chọn ảnh",
              },
            },
          } : {}),
        },
        onChange: async () => {
          const content = await editor.save();
          onChange(content);
        },
      };

      if (editorData && editorData.blocks && Array.isArray(editorData.blocks)) {
        config.data = editorData;
      }

      const editor = new EditorJS(config);
      editorRef.current = editor;
      // Expose instance for testing/automation
      (window as any).__fitEditor = editor;
    }
  }, [isReady]);

  return (
    <div className="prose prose-slate max-w-none dark:prose-invert w-full">
      <style suppressHydrationWarning>{`
        .codex-editor__redactor {
          padding-bottom: 2rem !important;
        }
        .ce-block__content, .ce-toolbar__content {
          max-width: 100%;
        }
        /* Image tool styles */
        .image-tool__image {
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .image-tool__caption[contenteditable] {
          font-size: 0.8rem;
          color: #64748b;
          text-align: center;
          font-style: italic;
          margin-top: 0.5rem;
        }
        .dark .image-tool__caption[contenteditable] {
          color: #94a3b8;
        }
        /* Dark mode overrides */
        .dark .ce-block__content {
          color: #f8fafc;
        }
        .dark .ce-toolbar__actions {
          background-color: transparent;
        }
        .dark .ce-toolbar__settings-btn, .dark .ce-toolbar__plus {
          color: #94a3b8;
        }
        .dark .ce-toolbar__settings-btn:hover, .dark .ce-toolbar__plus:hover {
          background-color: #334155;
          color: #f8fafc;
        }
        .dark .ce-popover {
          background-color: #1e293b;
          border-color: #334155;
        }
        .dark .ce-popover__item {
          color: #f8fafc;
        }
        .dark .ce-popover__item:hover {
          background-color: #334155;
        }
        .dark .ce-popover__item-icon {
          background-color: #0f172a;
          color: #f8fafc;
        }
        .dark .cdx-search-field {
          background-color: #0f172a;
          color: #f8fafc;
          border-color: #334155;
        }
        .dark .image-tool {
          background-color: transparent;
        }
      `}</style>
      <div
        id="editorjs"
        className="min-h-[400px] bg-white dark:bg-slate-800 rounded-md p-4 w-full"
      ></div>
    </div>
  );
}

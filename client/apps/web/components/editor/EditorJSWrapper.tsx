"use client";

import { useEffect, useRef, useState } from "react";

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
    // Tải EditorJS & Plugins qua CDN
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.31.3/dist/editorjs.umd.min.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/header@latest/dist/bundle.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/list@latest/dist/bundle.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/quote@latest/dist/bundle.js",
      "https://cdn.jsdelivr.net/npm/@editorjs/embed@latest/dist/bundle.js",
    ];

    let loadedCount = 0;

    const checkReady = () => {
      loadedCount++;
      if (loadedCount === scripts.length) {
        setIsReady(true);
      }
    };

    scripts.forEach((src) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        checkReady();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = checkReady;
      script.onerror = () => {
        console.error(`Failed to load Editor.js script: ${src}`);
        checkReady();
      };
      document.body.appendChild(script);
    });

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isReady && !editorRef.current) {
      // Init Editor
      // @ts-ignore
      const EditorJS = window.EditorJS;

      const editorData =
        typeof value === "string" && value.length > 0
          ? JSON.parse(value)
          : value;

      const config: any = {
        holder: "editorjs",
        placeholder: placeholder,
        tools: {
          // @ts-ignore
          ...(window.Header ? { header: { class: window.Header } } : {}),
          // @ts-ignore
          ...(window.List ? { list: { class: window.List } } : {}),
          // @ts-ignore
          ...(window.Quote ? { quote: { class: window.Quote } } : {}),
          // @ts-ignore
          ...(window.Embed ? { embed: { class: window.Embed } } : {}),
        },
        onChange: async () => {
          const content = await editor.save();
          onChange(content); // Luôn pass JSON Object ra ngoài cho form submit
        },
      };

      // Chỉ gắn data vào config khi value thực sự có chứa array blocks hợp lệ để tránh Crash lỗi
      if (editorData && editorData.blocks && Array.isArray(editorData.blocks)) {
        config.data = editorData;
      }

      const editor = new EditorJS(config);
      editorRef.current = editor;
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
        
        /* Dark mode overrides for EditorJS */
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
      `}</style>
      <div
        id="editorjs"
        className="min-h-[400px] bg-white dark:bg-slate-800 rounded-md p-4 w-full"
      ></div>
    </div>
  );
}

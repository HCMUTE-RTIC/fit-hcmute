'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { FormsService } from '@/services/forms.service';
import { Trash2, ChevronDown, ChevronUp, GripVertical, Plus, Type, AlignLeft, Mail, Phone, CheckSquare, ListOrdered, Upload, Circle, CheckCircle2 } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Separator } from "@workspace/ui/components/separator";
import { Label } from "@workspace/ui/components/label";

type FieldType = 'TEXT' | 'TEXTAREA' | 'EMAIL' | 'PHONE' | 'SELECT' | 'RADIO' | 'CHECKBOX' | 'FILE';

interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  order: number;
}

const FIELD_TYPES: { value: FieldType; label: string; icon: React.ElementType }[] = [
  { value: 'TEXT', label: 'Small text field', icon: Type },
  { value: 'TEXTAREA', label: 'Big text field', icon: AlignLeft },
  { value: 'EMAIL', label: 'Email', icon: Mail },
  { value: 'PHONE', label: 'Phone', icon: Phone },
  { value: 'SELECT', label: 'Single select', icon: CheckCircle2 },
  { value: 'RADIO', label: 'Radio', icon: Circle },
  { value: 'CHECKBOX', label: 'Multi select', icon: CheckSquare },
  { value: 'FILE', label: 'Upload file', icon: Upload },
];

export default function FormBuilderPage() {
  const router = useRouter();

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [expandedFieldId, setExpandedFieldId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      name: `field_${fields.length + 1}`,
      label: `Field ${fields.length + 1}`,
      type,
      required: false,
      options: type === 'SELECT' || type === 'RADIO' || type === 'CHECKBOX' ? ['Option 1', 'Option 2'] : undefined,
      order: fields.length,
    };
    setFields([...fields, newField]);
    setExpandedFieldId(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => field.id === id ? { ...field, ...updates } : field));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    if (expandedFieldId === id) setExpandedFieldId(null);
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...fields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFields.length) return;

    const temp = newFields[index];
    newFields[index] = newFields[targetIndex] as FormField;
    newFields[targetIndex] = temp as FormField;

    setFields(newFields.map((field, i) => ({ ...field, order: i })));
  };

  const handlePublish = async () => {
    if (!formTitle.trim()) {
      toast.error('Vui lòng nhập tên form');
      return;
    }
    if (fields.length === 0) {
      toast.error('Vui lòng thêm ít nhất 1 field');
      return;
    }

    const formData = {
      title: formTitle,
      description: formDescription,
      fields: fields.map(({ id, ...field }) => field), // eslint-disable-line @typescript-eslint/no-unused-vars
    };

    try {
      setSaving(true);
      const result = await FormsService.create(formData);
      toast.success('Tạo form thành công!');
      router.push(`/admin/forms/${result.slug}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Không thể kết nối tới server');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Builder</h1>
          <p className="text-muted-foreground mt-1">Tạo form động thu thập thông tin.</p>
        </div>
        <Link href="/admin/forms">
          <Button variant="outline">Quay lại</Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-indigo-500" />
            <span className="font-semibold">Chi tiết Form</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label>Tên Form</Label>
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="VD: Khảo sát tham dự Lễ kỷ niệm"
            />
          </div>
          <div className="space-y-2">
            <Label>Mô tả ngắn</Label>
            <Input
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Giải thích mục đích form này..."
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label className="text-muted-foreground font-normal">Cho phép gửi phản hồi ngay lập tức</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-500" />
            <span className="font-semibold">Danh sách Fields</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-4">
            Thêm các field (câu hỏi) mà bạn muốn người tham gia trả lời.
          </div>

          <div className="space-y-3 mb-6">
            {fields.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                <p className="text-muted-foreground">Chưa có field nào.</p>
              </div>
            ) : fields.map((field, index) => {
              const isExpanded = expandedFieldId === field.id;
              const FieldIcon = FIELD_TYPES.find(t => t.value === field.type)?.icon || Type;

              return (
                <div key={field.id} className="border rounded-md overflow-hidden bg-background">
                  {/* Field Header */}
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                    onClick={() => setExpandedFieldId(isExpanded ? null : field.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground" title="Drag to reorder (Coming soon)"><GripVertical className="w-4 h-4" /></div>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                        <FieldIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-sm">{field.label || 'Tên câu hỏi...'}</span>
                      {field.required && <span className="text-red-500 text-lg leading-none">*</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={(e) => { e.stopPropagation(); moveField(index, 'up'); }} disabled={index === 0}><ChevronUp className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={(e) => { e.stopPropagation(); moveField(index, 'down'); }} disabled={index === fields.length - 1}><ChevronDown className="w-4 h-4" /></Button>
                      <div className="w-px h-5 bg-border mx-1" />
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>

                  {/* Expanded Edit Area */}
                  {isExpanded && (
                    <div className="p-4 border-t bg-slate-50 dark:bg-slate-900/20 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tên Field (Lưu DB)</Label>
                          <Input value={field.name} onChange={(e) => updateField(field.id, { name: e.target.value })} placeholder="VD: full_name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Loại hiển thị</Label>
                          <Select
                            value={field.type}
                            onValueChange={(val: FieldType) => updateField(field.id, { type: val })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {FIELD_TYPES.map(t => (
                                <SelectItem key={t.value} value={t.value}>
                                  <div className="flex items-center gap-2">
                                    <t.icon className="w-4 h-4 text-muted-foreground" />
                                    <span>{t.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Câu hỏi (Label hiển thị)</Label>
                        <Input value={field.label} onChange={(e) => updateField(field.id, { label: e.target.value })} placeholder="Nhập câu hỏi tại đây..." />
                      </div>

                      {(field.type === 'SELECT' || field.type === 'RADIO' || field.type === 'CHECKBOX') && (
                        <div className="space-y-3 pt-2">
                          <Label>Các lựa chọn (Options)</Label>
                          <div className="space-y-2">
                            {(field.options || []).map((opt, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-2">
                                <div className="p-1 px-2 border bg-white dark:bg-slate-950 rounded shadow-sm">
                                  {field.type === 'RADIO' ? <Circle className="w-3.5 h-3.5 text-muted-foreground" /> : field.type === 'CHECKBOX' ? <CheckSquare className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                                </div>
                                <Input
                                  value={opt}
                                  className="h-9"
                                  onChange={(e) => {
                                    const newOpts = [...(field.options || [])];
                                    newOpts[optIndex] = e.target.value;
                                    updateField(field.id, { options: newOpts });
                                  }}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 text-muted-foreground hover:text-red-500"
                                  onClick={() => {
                                    const newOpts = (field.options || []).filter((_, i) => i !== optIndex);
                                    updateField(field.id, { options: newOpts });
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-indigo-600 dark:text-indigo-400 mt-2 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                              onClick={() => {
                                const newOpts = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
                                updateField(field.id, { options: newOpts });
                              }}
                            >
                              <Plus className="w-4 h-4 mr-1.5" /> Thêm option
                            </Button>
                          </div>
                        </div>
                      )}

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeField(field.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <div className="flex items-center gap-2 border bg-white dark:bg-slate-950 px-2 py-1 rounded-md">
                            <Switch
                              checked={field.required}
                              onCheckedChange={(val) => updateField(field.id, { required: val })}
                              id={`req-${field.id}`}
                            />
                            <Label htmlFor={`req-${field.id}`} className="cursor-pointer text-sm">Required</Label>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setExpandedFieldId(null)}>Đóng</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full border-dashed text-indigo-600 dark:text-indigo-400 font-medium">
                <Plus className="w-4 h-4 mr-2" /> Add fields
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[300px]">
              {FIELD_TYPES.map((t) => (
                <DropdownMenuItem key={t.value} onClick={() => addField(t.value)} className="cursor-pointer py-2.5">
                  <t.icon className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>{t.label}</span>
                  <span className="ml-auto text-xs font-semibold text-indigo-600 dark:text-indigo-400">Add</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-slate-50 dark:bg-slate-900/50 py-4">
          <Button variant="ghost" onClick={() => router.back()} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button onClick={handlePublish} disabled={saving || !formTitle || fields.length === 0} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

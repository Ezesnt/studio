
"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Badge } from "../ui/badge"
import { Calendar, Syringe, Paperclip, FileText, Image as ImageIcon, Link as LinkIcon } from "lucide-react"
import { Combobox } from "@/components/ui/combobox"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

export interface FormFieldConfig {
  name: string
  label: string
  type:
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "file"
    | "textarea"
    | "datetime-local"
    | "email"
    | "url"
    | "hidden"
    | "combobox"
  placeholder?: string
  required?: boolean
  options?: { value: string; text: string }[]
  value?: any
  omitInView?: boolean
}

export interface FormConfig {
  id: string
  title: string
  fields?: FormFieldConfig[]
  confirmationText?: string
  comment?: string;
}

interface DynamicFormProps {
  formConfig: FormConfig | null
  isOpen: boolean
  onClose: () => void
  item?: any
}

function getFileIcon(fileName: string) {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
        return <ImageIcon className="h-4 w-4" />;
    }
    if (extension === 'pdf') {
        return <FileText className="h-4 w-4" />;
    }
    return <Paperclip className="h-4 w-4" />;
}

export function DynamicForm({ formConfig, isOpen, onClose, item }: DynamicFormProps) {
  const { toast } = useToast()

  const generateSchema = (fields: FormFieldConfig[]) => {
    const schema: { [key: string]: z.ZodType<any, any> } = {}
    fields.forEach((field) => {
      let fieldSchema: z.ZodType<any, any>
      switch (field.type) {
        case "text":
        case "textarea":
        case "select":
        case "combobox":
        case "file":
        case "datetime-local":
        case "url":
          fieldSchema = z.string()
          if (field.required) {
            fieldSchema = fieldSchema.min(1, `${field.label} es requerido.`)
          }
          if (field.type === "url") {
            fieldSchema = fieldSchema.url("URL inválida.")
          }
          break
        case "email":
          fieldSchema = z.string().email("Email inválido.")
          if (field.required) {
            fieldSchema = fieldSchema.min(1, `${field.label} es requerido.`)
          }
          break
        case "number":
          fieldSchema = z.coerce.number()
          if (field.required) {
            fieldSchema = fieldSchema.min(0, "Debe ser un número positivo.")
          }
          break
        case "checkbox":
          fieldSchema = z.boolean().default(false)
          break
        default:
          fieldSchema = z.any()
      }
      schema[field.name] = field.required ? fieldSchema : fieldSchema.optional()
    })
    return z.object(schema)
  }

  const formSchema = formConfig?.fields ? generateSchema(formConfig.fields) : z.object({})
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formConfig?.fields?.reduce((acc, field) => {
      const itemValue = item && item[field.name]
      if (itemValue !== undefined) {
        acc[field.name] = itemValue
      } else {
        acc[field.name] = field.type === 'checkbox' ? false : ''
      }
      if (field.type === 'hidden') {
        acc[field.name] = field.value
      }
      return acc
    }, {} as any) || {},
  })

  React.useEffect(() => {
    if (formConfig?.fields && isOpen) {
      const defaultValues = formConfig.fields.reduce((acc, field) => {
        const itemValue = item && item[field.name]
        if (itemValue !== undefined) {
          acc[field.name] = itemValue
        } else {
          acc[field.name] = field.type === 'checkbox' ? false : (field.value !== undefined ? field.value : '')
        }
        return acc
      }, {} as any)
      form.reset(defaultValues)
    }
  }, [formConfig, isOpen, item, form])


  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data)
    toast({
      title: "Formulario Enviado",
      description: "Los datos se han procesado exitosamente.",
    })
    onClose()
  }

  if (!formConfig) return null

  // Special case for displaying health book
  if (formConfig.id === 'viewAnimalHealthBookForm') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Libreta Sanitaria de {item?.name}</DialogTitle>
            <DialogDescription>
              Historial clínico completo del animal.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
              {item?.historial_clinico && item.historial_clinico.length > 0 ? (
                item.historial_clinico.map((record: any, index: number) => (
                  <Card key={index} className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base flex justify-between items-center">
                        <span className="capitalize flex items-center gap-2">
                           {record.tipo === 'Consulta' ? <Calendar className="size-4" /> : <Syringe className="size-4" />}
                           {record.tipo}
                        </span>
                        <Badge variant="secondary">{record.fecha}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{record.descripcion}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No hay registros en el historial clínico.</p>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Special case for adoption details
  if (formConfig.id === 'viewAdoptionDetailsForm' && item) {
    const handleContact = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl">{item.nombre}</DialogTitle>
            <DialogDescription>
              Publicado el {new Date(item.fecha_publicacion).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6 py-4">
               {item.fotos && item.fotos.length > 0 && (
                <Carousel className="w-full">
                    <CarouselContent>
                    {item.fotos.map((foto: any, index: number) => (
                        <CarouselItem key={index}>
                            <Image
                                src={foto.url}
                                alt={`Foto de ${item.nombre} ${index + 1}`}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover rounded-md"
                                data-ai-hint={foto.hint}
                            />
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
               )}
              <Card>
                <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div><p className="font-semibold">Especie:</p> <p className="text-muted-foreground">{item.especie}</p></div>
                    <div><p className="font-semibold">Raza:</p> <p className="text-muted-foreground">{item.raza}</p></div>
                    <div><p className="font-semibold">Edad:</p> <p className="text-muted-foreground">{item.edad}</p></div>
                    <div><p className="font-semibold">Sexo:</p> <p className="text-muted-foreground">{item.sexo}</p></div>
                    <div><p className="font-semibold">Color:</p> <p className="text-muted-foreground">{item.color}</p></div>
                    <div><p className="font-semibold">Tamaño:</p> <p className="text-muted-foreground">{item.tamanio}</p></div>
                </CardContent>
              </Card>
              <div className="space-y-2">
                <h3 className="font-semibold">Detalles de Adopción</h3>
                <p className="text-muted-foreground text-sm">{item.detalle}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Observaciones</h3>
                <p className="text-muted-foreground text-sm">{item.observaciones}</p>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="sm:justify-between gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cerrar</Button>
            <Button onClick={() => handleContact(item.url_contacto)}>
                <LinkIcon className="mr-2"/> Contactar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  const readOnlyForms = ['viewComplaintDetailsForm', 'viewAnimalDetailsForm'];
  const isReadOnlyForm = readOnlyForms.includes(formConfig.id);


  const renderField = (fieldConfig: FormFieldConfig, formField: any) => {
    const { name, label, type, placeholder, options, required, omitInView } = fieldConfig;
    
    if (isReadOnlyForm && omitInView) return null;
    
    const fieldLabel = required ? `${label} *` : label;
    
    if (type === 'hidden') {
      return <Input type="hidden" {...formField} />
    }

    return (
      <FormItem>
        <FormLabel>{fieldLabel}</FormLabel>
        <FormControl>
          <>
            {type === "select" && options ? (
              <Select onValueChange={formField.onChange} defaultValue={formField.value} disabled={isReadOnlyForm}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "combobox" && options ? (
              <Combobox
                options={options}
                value={formField.value}
                onChange={formField.onChange}
                placeholder={placeholder}
                searchPlaceholder="Buscar..."
                disabled={isReadOnlyForm}
              />
            ) : type === "checkbox" ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formField.value}
                  onCheckedChange={formField.onChange}
                  disabled={isReadOnlyForm}
                />
                 <label
                  htmlFor={name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            ) : type === "textarea" ? (
              <Textarea placeholder={placeholder} {...formField} readOnly={isReadOnlyForm} />
            ) : (
              <Input type={type} placeholder={placeholder} {...formField} value={formField.value || ''} readOnly={isReadOnlyForm} />
            )}
          </>
        </FormControl>
        <FormMessage />
      </FormItem>
    )
  }
  
  const handleConfirmAction = () => {
    console.log("Confirmed:", formConfig.title);
    toast({
      title: "Acción Confirmada",
      description: `La acción "${formConfig.title}" se ha ejecutado.`,
    })
    onClose();
  }

  const renderAttachments = () => {
    if (formConfig.id === 'viewComplaintDetailsForm' && item?.archivos?.length > 0) {
      return (
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-sm">Archivos adjuntos:</h3>
          <ul className="space-y-2">
            {item.archivos.map((archivo: any) => (
              <li key={archivo.id}>
                <a
                  href={archivo.ruta_archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  {getFileIcon(archivo.nombre_archivo)}
                  <span className="truncate">{archivo.nombre_archivo.split('/').pop()}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{formConfig.title}</DialogTitle>
           {(formConfig.confirmationText || formConfig.comment) && (
             <DialogDescription>{formConfig.confirmationText || formConfig.comment}</DialogDescription>
           )}
        </DialogHeader>
        {formConfig.fields ? (
          <ScrollArea className="max-h-[70vh] pr-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                {formConfig.fields.map((field) => (
                  field.type !== "checkbox" ? (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name as any}
                      render={({ field: formField }) => renderField(field, formField)}
                    />
                  ) : null
                ))}
                {formConfig.fields.filter(f => f.type === 'checkbox').map((field) => (
                   <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name as any}
                      render={({ field: formField }) => renderField(field, formField)}
                    />
                ))}

                {renderAttachments()}

                <DialogFooter className="pt-4">
                  <Button type="button" variant="ghost" onClick={onClose}>
                    {isReadOnlyForm ? "Cerrar" : "Cancelar"}
                  </Button>
                  {!isReadOnlyForm && <Button type="submit">Guardar</Button>}
                </DialogFooter>
              </form>
            </Form>
          </ScrollArea>
        ) : (
           <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
              <Button onClick={handleConfirmAction}>Confirmar</Button>
           </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

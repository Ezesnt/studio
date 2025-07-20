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
  placeholder?: string
  required?: boolean
  options?: { value: string; text: string }[]
  value?: any
}

export interface FormConfig {
  id: string
  title: string
  fields?: FormFieldConfig[]
  confirmationText?: string
}

interface DynamicFormProps {
  formConfig: FormConfig | null
  isOpen: boolean
  onClose: () => void
  item?: any
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

  const renderField = (fieldConfig: FormFieldConfig, formField: any) => {
    const { name, label, type, placeholder, options } = fieldConfig
    
    if (type === 'hidden') {
      return <Input type="hidden" {...formField} />
    }

    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <>
            {type === "select" && options ? (
              <Select onValueChange={formField.onChange} defaultValue={formField.value}>
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
            ) : type === "checkbox" ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formField.value}
                  onCheckedChange={formField.onChange}
                />
                 <label
                  htmlFor={name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            ) : type === "textarea" ? (
              <Textarea placeholder={placeholder} {...formField} />
            ) : (
              <Input type={type} placeholder={placeholder} {...formField} value={formField.value || ''}/>
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formConfig.title}</DialogTitle>
           {formConfig.confirmationText && (
             <DialogDescription>{formConfig.confirmationText}</DialogDescription>
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
                <DialogFooter className="pt-4">
                  <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                  <Button type="submit">Guardar</Button>
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

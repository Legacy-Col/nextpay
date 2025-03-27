import React from 'react';
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from 'zod';
import { Control, FieldPath } from 'react-hook-form';
import { authformSchema } from '@/lib/utils';


const formSchema = authformSchema('sign-up')

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomForm = ({ control, name, label, placeholder }: CustomInput) => {   
  return (
    <div>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
            <div className="mb-4">
            <FormLabel className="mb-2">
                {label}
            </FormLabel>
            <div className="flex w-full flex-col">
                <FormControl>
                <Input
                    placeholder={placeholder}
                    className="input-field"
                    type={name === 'password' ? 'password' : 'text'}  
                    {...field}
                />
                </FormControl>
                <FormMessage className="form-message mt-2"/>
            </div>
            </div>
        )}
        />
    </div>
  );
}

export default CustomForm;

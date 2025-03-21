import React from 'react';
import { FormField, FormLabel, FormControl, FormMessage } from './ui/form';
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { authformSchema } from '@/lib/utils';

interface CustomInput {
    control: Control<z.infer<typeof authformSchema>>,
    name: FieldPath<z.infer<typeof authformSchema>>,
    label: string,
    placeholder: string
}

const CustomForm = ({control, name, label, placeholder} : CustomInput) => {
  return (
    <div>
      <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <div className='flex-item'>
              <FormLabel className='form-label'>
                  {label}
              </FormLabel>
              <div className='flex flex-col w-full'>
                <FormControl>
                        <input
                            type='password'
                            required
                            placeholder={placeholder}
                            className='border border-neutral-900 rounded-md w-full py-2 my-2 px-2'
                  
                            // Remeber to always spread the props of the field if we want it to work
                  
                             {...field}
                         />    
                </FormControl>
                <FormMessage  className='text-red-900 font-light text-1xl'/>
              </div>
           </div>
          )}
        />
    </div>
  );
}

export default CustomForm;

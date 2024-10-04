'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface GeneralSettingsForm {
  editBagTime: string;
  editDayValue: number;
}

export const SettingForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<GeneralSettingsForm>({
    defaultValues: {
      editBagTime: '',
      editDayValue: 0,
    },
  });

  const onSubmit = (data: GeneralSettingsForm) => {
    console.log(data);
    // Here you would typically make an API call to save the data
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="General Settings"
          description="Manage General Settings"
        />
      </div>
      <Separator />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block my-2 text-sm font-medium text-gray-700 dark:text-gray-300">Allowed Time For Bag Edit</label>
          <Controller
            name="editBagTime"
            control={control}
            rules={{ required: 'Edit Bag Time is required' }}
            render={({ field }) => (
              <Input
                type="time"
                {...field}
              />
            )}
          />
          {errors.editBagTime && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.editBagTime.message}
            </p>
          )}
        </div>

        <div>
          <label className="block my-2 text-sm font-medium text-gray-700 dark:text-gray-300">Bags can be Edited before (T-1 Value)</label>
          <Controller
            name="editDayValue"
            control={control}
            rules={{ required: 'Day Value is required', min: 1, max: 31 }}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
              />
            )}
          />
          {errors.editDayValue && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.editDayValue.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default SettingForm;

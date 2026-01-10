import React, { useRef } from "react";

import { useModal } from "@/hooks";

interface BaseInputField {
  type: string;
  name: string;
  label?: string;
}

interface TextInputField extends BaseInputField {
  type: "text";
  label: string;
  defaultValue?: string;
}

interface SelectInputField extends BaseInputField {
  type: "select";
  label: string;
  options: {
    value: number;
    text: string;
  }[];
  noOptionsMessage: string;
}

interface CustomInputField extends BaseInputField {
  type: "custom";
  content: React.ReactElement;
}

type ModalInputField = TextInputField | SelectInputField | CustomInputField;

interface ModalFormProps {
  title: string;
  fields: ModalInputField[];
  submitText: string;
  submitStyle: string;
  onSubmit: (formData: FormData) => void;
  submitHidden?: boolean;
}

const ModalForm = ({
  title,
  fields,
  submitText,
  submitStyle,
  onSubmit,
  submitHidden = false,
}: ModalFormProps) => {
  const { closeModal } = useModal();

  const formRef = useRef(null);
  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        if (!formRef.current) return;

        onSubmit(new FormData(formRef.current));
        closeModal();
      }}
      className="flex min-w-[min(20rem,80vw)] flex-col gap-8"
    >
      <h1 className="text-center text-2xl font-bold">{title}</h1>
      <div className="flex flex-col gap-8 text-lg">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col gap-4">
            {field.label && (
              <label htmlFor={field.name} className="font-medium">
                {field.label}
              </label>
            )}
            {field.type === "custom" ? (
              field.content
            ) : field.type === "select" ? (
              !field.options || field.options.length === 0 ? (
                <p className="text-center">
                  {field.noOptionsMessage || "Options not found"}
                </p>
              ) : (
                <select
                  className="rounded-md border border-base-3 bg-base-2 px-3 py-1"
                  name={field.name}
                  id={field.name}
                >
                  {field.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              )
            ) : (
              <input
                name={field.name}
                id={field.name}
                type={field.type}
                defaultValue={field.defaultValue || ""}
                required
                className="rounded-md border border-base-3 bg-base-2 px-3 py-1"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 rounded-md border border-base-3 bg-base-2 py-2 font-bold"
        >
          Cancel
        </button>
        {!submitHidden && (
          <button
            type="submit"
            className={`${submitStyle || ""} flex-1 rounded-md border py-2 font-bold text-slate-50`}
          >
            {submitText}
          </button>
        )}
      </div>
    </form>
  );
};

export default ModalForm;

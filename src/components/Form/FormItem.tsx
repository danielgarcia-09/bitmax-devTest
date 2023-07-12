import { HTMLInputTypeAttribute } from "react";

export interface FormItemPropsI {
    label: string;
    name: string;
    value: string;
    onChange: (e: any) => void;
    type: HTMLInputTypeAttribute | undefined;
    placeholder?: string;
    error?: boolean;
    errorText?: string;
}

export interface FormItemI extends Omit<FormItemPropsI, "onChange"> { }

const FormItem = (props: FormItemPropsI) => {

    const { label, name, value, onChange, type, placeholder, error, errorText } = props;

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="block text-md font-semibold text-gray-700 "
            >
                {label}
            </label>
            <div className="mx-1 w-auto flex flex-col">
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    className="h-10 border rounded-md px-5 py-3 hover:ring-2 hover:ring-blue-2000 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder={placeholder}
                />

                {error && <span className="text-red-500 text-sm font-semibold">{errorText || `${name} is required`}</span>}
            </div>
        </div>
    )
}

export default FormItem;
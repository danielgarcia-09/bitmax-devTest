import FormItem, { FormItemI } from "./FormItem";

export interface FormPropsI {
    items: FormItemI[];
    customClass?: string;
    onSubmit: (e: any) => void;
    onChange: (e: any) => void;
}

const Form = (props: FormPropsI) => {

    const { items, customClass, onSubmit, onChange } = props;

    const isError = items.some((item) => item.error);

    return (
        <form onSubmit={onSubmit} className={`w-full flex flex-col gap-3`}>

            <div className={`${customClass}`}>


                {items.map((item) => (
                    <FormItem key={item.name} {...item} onChange={onChange} />
                ))}
            </div>

            <div className={`self-center items-center mt-6 md:mt-0 w-full justify-center md:justify-normal flex ${isError ? "items-center" : "items-end"}`}>
                <button
                    type="submit"
                    className="w-1/2 lg:w-full mb-3 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-5 h-10 rounded-md mt-[5px]">
                    Search
                </button>
            </div>
        </form>
    )
}

export default Form;
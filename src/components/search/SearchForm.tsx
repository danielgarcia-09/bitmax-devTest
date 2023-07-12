import { setAnnouncements } from "@/redux/announcements/announcement.slice";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../Form/Form";
import { FormItemI } from "../Form/FormItem";

interface SearchFormI {
    search?: string | undefined;
    from?: string | undefined;
    to?: string | undefined; 
    orderBy?: string | undefined;
}

const SearchForm = () => {

    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        search: "",
        from: "",
        to: "",
        orderBy: ""
    });

    const [errors, setErrors] = useState({
        search: "",
        from: "",
        to: ""
    })
    const { search, from, to, orderBy } = formData;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!search) {
            setErrors({
                ...errors,
                search: "Search is required"
            })
            return;
        }

        if ((!search && !from && !to) || (from && !to) || (!from && to)) {
            setErrors({
                ...errors,
                from: "From is required",
                to: "To is required"
            })
            return;
        }

        setErrors({ from: "", to: "", search: "" })

        const params = {
            ...((from && to) && { dateRange: { from, to } }),
            ...(orderBy && { orderBy }),
            ...(search) && { search }
        }

        getAnnouncements(params);
    }
    const getAnnouncements = (params: SearchFormI = {}) => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/announcements`, { params }).then((response) => {
            dispatch(setAnnouncements(response.data))
            setFormData({ search: "", from: "", to: "", orderBy })
        }).catch((error) => {
            console.log("❗ ~ file: SearchForm.tsx:44 ~ axios.get ~ error:", error)
            dispatch(setAnnouncements([]))
        })
    }

    useEffect(() => {
        getAnnouncements()
    },[])

    const items: FormItemI[] = [
        { label: "Keyword", name: "search", type: "text", placeholder: "Search by title, content or link", value: search, error: !!errors.search, errorText: errors.search },
        { label: "From", name: "from", type: "datetime-local", placeholder: "", value: from, error: !!errors.from, errorText: errors.from },
        { label: "To", name: "to", type: "datetime-local", placeholder: "", value: to, error: !!errors.to, errorText: errors.to },
    ]

    return (
        <section className="flex flex-col gap-3">
            <Form
                customClass="flex flex-wrap gap-5 justify-center"
                items={items}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
            <div className="flex flex-wrap items-center justify-between">
                <select
                    name="orderBy"
                    value={orderBy}
                    onChange={e => setFormData({ ...formData, orderBy: e.target.value })}
                    className="border rounded-md px-5 py-3 hover:ring-2 hover:ring-blue-2000 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Order by Date</option>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
                <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-5 h-10 rounded-md mt-[5px]"
                    onClick={() => getAnnouncements()}
                >
                    Show all
                </button>
            </div>

        </section>
    )
}


export default SearchForm;

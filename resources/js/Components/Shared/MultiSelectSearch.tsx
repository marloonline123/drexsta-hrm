import { MultiSelect } from '@/Components/Ui/multi-select';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

type ItemType = { value: string; label: string };

interface MultiSelectSearchProps {
    defaultValue?: string[];
    setData: (key: string, value: any) => void;
    formKey: string;
    searchRoute: string;
    placeholder?: string;
    valueKey?: string;
    labelKey?: string;
}

export default function MultiSelectSearch({
    defaultValue = [],
    setData,
    formKey,
    searchRoute,
    placeholder,
    valueKey = 'id',
    labelKey = 'name',
}: MultiSelectSearchProps) {
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [items, setItems] = useState<ItemType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchItems = async (query: string) => {
        // if (!query) {
        //     setItems([]);
        //     return;
        // }
        setIsLoading(true);
        try {
            const res = await axios.post(route(searchRoute), { search: query });
            // const mappedItems = res.data.data.map((item: any) => ({
            //     label: item[labelKey],
            //     value: item[valueKey].toString(),
            // }));
            setItems(res.data.data);
        } catch (error) {
            console.error(`Failed to fetch items from ${searchRoute}:`, error);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        searchItems(debouncedSearch);

        return () => {
            setItems([]); // Clear items when the component unmounts
        };
    }, [debouncedSearch]);

    const handleValueChange = (values: string[]) => {
        setData(formKey, values);
    };

    // Fetch initial labels for default values if they are not already loaded
    // useEffect(() => {
    //     if (defaultValue.length > 0 && items.length === 0) {
    //         // This is a simplified approach. A real implementation might need a dedicated endpoint
    //         // to fetch items by their IDs to get their labels.
    //         // For now, we assume the initial search will populate the list.
    //     }
    // }, [defaultValue]);


    return (
        <div>
            <MultiSelect
                className='w-full'
                options={items}
                onValueChange={handleValueChange}
                defaultValue={defaultValue}
                placeholder={placeholder}
                variant="inverted"
                animation={2}
                maxCount={10} // Increased max count
                setSearch={setSearch}
                search={search}
                disabled={isLoading}
            />
        </div>
    )
}

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQuery = ({ name, value }: { name: string; value: string }) => {
    console.log("start change");
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.set(name, value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    console.log("end change");
  };

  const deleteQuery = (name?: string) => {
    if (!name) return searchParams.delete();
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete(name);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return { setQuery, deleteQuery };
};

export default useQuery;

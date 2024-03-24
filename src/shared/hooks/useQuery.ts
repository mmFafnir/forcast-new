import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQuery = (keyQuery?: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQuery = ({ name, value }: { name: string; value: string }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.set(name, value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(query);

    router.push(`${pathname}${query}`);
    window.history.pushState(null, "", `${pathname}${query}`);
    // router.replace(`#${name}=${value}`);
  };

  const deleteQuery = (name?: string) => {
    if (!name) return searchParams.delete();
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete(name);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  };

  return { setQuery, deleteQuery, query: searchParams.get(keyQuery || "") };
};

export default useQuery;

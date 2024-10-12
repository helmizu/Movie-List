import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "../ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(new URLSearchParams(window.location.search).get('q') || '');
  const searchDebounced = useDebounce(search, 500);

  const onSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (searchDebounced) {
      if (location.pathname !== '/search') {
        navigate('/search?q=' + searchDebounced);
      } else {
        navigate('/search?q=' + searchDebounced, { replace: true });
      }
    } else {
      if (location.pathname === '/search') {
        navigate(-1);
      }
    }
  }, [searchDebounced])

  return (
    <div className="border-b px-2 lg:px-4 flex justify-between items-center">
      <Menubar className="rounded-none border-none">
        <MenubarMenu>
          <Link to="/">
            <MenubarTrigger className="font-bold cursor-pointer">Movie</MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <MenubarContent forceMount>
            <MenubarLabel>Switch Account</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioGroup value="helmi">
              <MenubarRadioItem value="helmi">Helmi</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Add Account...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Input
        placeholder="Search ..."
        className="h-7 py-0 w-60"
        startIcon={<SearchIcon size={16} />}
        onChange={(e) => onSearch(e.target.value)}
        value={search}
        endIcon={search ? <XIcon size={16} onClick={() => setSearch("")} className="cursor-pointer" /> : undefined}
      />
    </div>
  );
};

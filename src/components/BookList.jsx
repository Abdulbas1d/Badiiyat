import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://library-project-6agw.onrender.com/get_books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API xatosi:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center">
        <Button className="mx-auto flex items-center" disabled>
          <Loader2 className="animate-spin" />
          Malumotlar yuklanmoqda...
        </Button>
      </div>
    );

  return (
    <div className="p-5">
      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="  border-2 border-gray-300 shadow-lg shadow-gray-400/50 hover:bg-gray-100 dark:border-gray-600 dark:shadow-gray-800/50 dark:hover:bg-gray-800 p-3 px-4 mb-8"
            >
              <Plus />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-2xl overflow-y-auto">
            <form>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">Add Book</SheetTitle>
                <SheetDescription>
                  Kitob qo'shish uchun ma'lumotlarni to'ldiring
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Upload cover
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Pages
                  </Label>
                  <Input id="lastName" name="lastName" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="birthDate" className="text-right">
                    Year
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deathDate" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="deathDate"
                    name="deathDate"
                    type="number"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Input id="country" name="country" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Author
                  </Label>
                  <Input id="country" name="country" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Kitob haqida ma'lumot..."
                    className="col-span-3 min-h-[80px]"
                  />
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <ul className="mx-auto grid grid-cols-6 space-y-2">
        {books.map((book) => (
          <li key={book._id} className="rounded-lg p-4 shadow-md">
            <img
              src={book.img}
              alt={book.title}
              className="h-60 w-full rounded-lg object-cover"
            />
            <h3 className="font-dancing text-[20px] font-normal uppercase">
              {book.title}
            </h3>
            <p className="text-[12px] font-light capitalize text-gray-600">
              {book.author}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;

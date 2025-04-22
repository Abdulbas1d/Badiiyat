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
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    pages: "",
    year: "",
    price: "",
    country: "",
    author: "",
    description: ""
  })

  function handleChange(e) {
    const { name, value, type, files } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }))
  }

  function validate() {
    if (!formData.image) {
      toast.error("Rasm tanlang!")
      return false
    }

    if (!formData.title) {
      toast.error("Sarlavha (Title) kiritishingiz kerak!")
      return false
    } else if (formData.title.length < 3) {
      toast.error("Sarlavha eng kamida 3ta harfdan iborat bo'lishi kerak!")
      return false
    }

    if (!formData.pages) {
      toast.error("Sahifalar sonini kiritishingiz kerak!")
      return false
    }

    if (!formData.year) {
      toast.error("Yilni tanlashingiz kerak!")
      return false
    }

    if (!formData.price) {
      toast.error("Narxni kiritishingiz kerak!")
      return false
    }

    if (!formData.country) {
      toast.error("Davlat nomini kiritishingiz kerak!")
      return false
    } else if (formData.country.length < 3) {
      toast.error("Davlat nomi eng kamida 3ta harfdan iborat bo'lishi kerak!")
      return false
    }

    if (!formData.author) {
      toast.error("Muallif ismini kiritishingiz kerak!")
      return false
    } else if (formData.author.length < 3) {
      toast.error("Muallif ismi eng kamida 3ta harfdan iborat bo'lishi kerak!")
      return false
    }

    if (!formData.description) {
      toast.error("Tavsif kiritishingiz kerak!")
      return false
    }

    return true
  }

  async function handleCreate(event) {
    event.preventDefault()

    let isValid = validate()
    if (!isValid) {
      return
    }

    const newBook = new FormData();
    newBook.append("img", formData.image);
    newBook.append("title", formData.title);
    newBook.append("pages", formData.pages);
    newBook.append("year", formData.year);
    newBook.append("price", formData.price);
    newBook.append("country", formData.country);
    newBook.append("author", formData.author);
    newBook.append("description", formData.description);

    try {
      await axios.post(`https://library-project-6agw.onrender.com/add_book`, newBook, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      toast.success("Kitob muvaffaqqiyatli qo'shildi!")

      setFormData({
        image: null,
        title: "",
        pages: "",
        year: "",
        price: "",
        country: "",
        author: "",
        description: ""
      })

      fetch(`https://library-project-6agw.onrender.com/get_books`)
        .then((res) => res.json())
        .then((data) => setBooks(data))
    } catch (error) {
      toast.error("Kitobni qo'shishda xatolik yuz berdi!")
      console.log(error);
    }
  }

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
      <Toaster />
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
            <form onSubmit={handleCreate}>
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
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="firstName"
                    name="title"
                    className="col-span-3"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Pages
                  </Label>
                  <Input
                    id="lastName"
                    name="pages"
                    className="col-span-3"
                    value={formData.pages}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="birthDate" className="text-right">
                    Year
                  </Label>
                  <Input
                    id="birthDate"
                    name="year"
                    type="date"
                    className="col-span-3"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deathDate" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="deathDate"
                    name="price"
                    type="number"
                    className="col-span-3"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    className="col-span-3"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Author
                  </Label>
                  <Input
                    id="country"
                    name="author"
                    className="col-span-3"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="bio"
                    name="description"
                    placeholder="Kitob haqida ma'lumot..."
                    className="col-span-3 min-h-[80px]"
                    value={formData.description}
                    onChange={handleChange}
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

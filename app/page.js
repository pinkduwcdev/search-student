"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://sheetdb.io/api/v1/0wd75xeogfvfj");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const filteredData = debouncedSearchTerm
      ? data.filter((item) =>
          item["Họ và tên"].toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      : data;

  return (
      <div className="p-10 flex flex-col space-y-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Hệ thống tìm kiếm học sinh</p>
        </div>
        <Input
            placeholder="Nhập họ và tên để tìm kiếm..."
            className="max-w-[400px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Table>
            <TableCaption>A list of students.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>SBD</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Trường</TableHead>
                <TableHead>Tỉnh</TableHead>
                <TableHead className="text-right">Tên khi vào lớp Zoom</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.SBD}</TableCell>
                    <TableCell>{item["Họ và tên"]}</TableCell>
                    <TableCell>{item.Trường}</TableCell>
                    <TableCell>{item.Tỉnh}</TableCell>
                    <TableCell className="text-right">{item["Tên khi vào lớp Zoom"]}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  );
};

export default HomePage;

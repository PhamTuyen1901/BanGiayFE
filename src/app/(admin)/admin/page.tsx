"use client";
import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { DatePicker, Divider, Table } from "antd";

import dayjs from "dayjs";
import { quanLyDoanhThuServices } from "@/server";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Doanh Thu" },
  },
};

const labels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);

const SalesPage = () => {
  const [searchRevenue, setSearchRevenue] = useState(dayjs().year());
  const [totalRevenue, setTotalRevenue] = useState({ year: 0, month: 0 });
  const [dataRevenue, setDataRevenue] = useState({
    datasets: [
      {
        label: `Doanh thu qua các năm`,
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });
  const [dataRevenueByYear, setDataRevenueByYear] = useState({
    labels,
    datasets: [
      {
        label: `Doanh thu`,
        data: Array(12).fill(0),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const fetchData = async () => {
    try {
      const { data } = await quanLyDoanhThuServices.getRevenueByYear();
      //@ts-ignore
      const labelsYear = data.yearly_revenue.map((item) =>
        item.year.toString()
      );
      //@ts-ignore
      const revenues = data.yearly_revenue.map((item) => item.total_revenue);
      const tempTotalRevenue = revenues.reduce(
        (acc: any, revenue: any) => acc + revenue,
        0
      );
      setTotalRevenue((prevState) => ({
        ...prevState,
        year: tempTotalRevenue,
      }));
      setDataRevenue({
        //@ts-ignore
        labels: labelsYear,
        datasets: [
          {
            label: `Doanh thu ${searchRevenue}`,
            data: revenues,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchDataByMonth = async (year: number) => {
    try {
      const { data } = await quanLyDoanhThuServices.getRenueByMonth(year);

      let revenues = new Array(12).fill(0);
      //@ts-ignore
      data.monthly_revenue.map((item: any) => {
        revenues[item.month - 1] = item.total_revenue;
      });

      const tempTotalRevenue = revenues.reduce(
        (acc: any, revenue: any) => acc + revenue,
        0
      );
      setTotalRevenue((prevState) => ({
        ...prevState,
        month: tempTotalRevenue,
      }));

      setDataRevenueByYear((prevData: any) => ({
        ...prevData,
        datasets: [{ ...prevData.datasets[0], data: revenues }],
      }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const onSearch = (value: string) => {
    const year = dayjs(value).isValid() ? dayjs(value).year() : dayjs().year();
    setSearchRevenue(year);
  };

  useEffect(() => {
    fetchData();
    fetchDataByMonth(searchRevenue);
  }, [searchRevenue]);

  return (
    <div className="p-4 bg-white rounded-md ">
      <h2 className="text-2xl font-semibold">Báo cáo doanh thu qua từng năm</h2>
      <Divider />
      <div className="mt-2">
        <div className="flex items-center gap-5 font-semibold">
          <span>Tổng doanh thu : {totalRevenue.year.toLocaleString()} ₫</span>
        </div>
        <div className="grid grid-cols-7 items-center">
          <Line options={options} data={dataRevenue} />
        </div>
      </div>
      <h2 className="text-2xl mt-4 font-semibold">
        Báo cáo doanh thu theo từng tháng
      </h2>
      <Divider />
      <div className="mb-2">
        <p className="text-[16px] mb-1 text-[#4e4e4e]">
          Nhập năm cần xem doanh thu
        </p>
        <div className="flex items-center gap-5 font-semibold">
          <DatePicker
            onChange={onSearch}
            picker="year"
            //@ts-ignore
            defaultValue={dayjs().startOf("year")}
          />
          <span>
            Tổng doanh thu năm {searchRevenue} :{" "}
            {totalRevenue.month.toLocaleString()} vnđ
          </span>
        </div>
        <div className="grid grid-cols-7 items-center">
          <Line options={options} data={dataRevenueByYear} />
        </div>
      </div>
    </div>
  );
};

export default SalesPage;

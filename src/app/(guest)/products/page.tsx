"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Breadcrumb, Button, Form, FormProps, Radio, SelectProps } from "antd";
import { HomeOutlined, ProductOutlined } from "@ant-design/icons";

import CardProduct from "@/components/carosel/CardProduct";
import "../../../components/carosel/carosel.scss";
import { quanLySanPhamServices } from "@/server";
import { Product } from "@/types";

const ProductsPage = () => {
  const [products, setProducts] = useState<any>();
  const searchParams = useSearchParams();

  const search = searchParams.get("productName");
  console.log(search);

  const router = useRouter();
  const [options, setOptions] = useState([]);
  const onFinish: FormProps<any>["onFinish"] = async (values) => {
    let query = "";
    if (values.price != 0) {
      switch (+values.price) {
        case 1:
          query += "minPrice=0&maxPrice=500000&";
          break;
        case 2:
          query += "minPrice=500000&maxPrice=1000000&";
          break;
        case 3:
          query += "minPrice=1000000&";
          break;
        default:
          break;
      }
    }
    if (+values.categoryId !== 0) query += `styleId=${values.categoryId}&`;

    query += values.sortOrder == 1 ? "sortOrder=asc" : "sortOrder=desc";
    router.push(`/products?${query}`);
    try {
      const { data } = await quanLySanPhamServices.searchProducts(query);
      //@ts-ignore

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      console.log(search);

      const { data } =
        search != null
          ? await quanLySanPhamServices.searchProducts(`?productName=${search}`)
          : await quanLySanPhamServices.getAllProducts();
      //@ts-ignore

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const featchProductType = async () => {
    try {
      const { data } = await quanLySanPhamServices.getProductType();
      //@ts-ignore
      const newOptions = data.map((type: any) => ({
        value: type.styleId,
        label: type.styleName,
      }));
      setOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
    featchProductType();
  }, [search]);
  return (
    <div className="mt-5 m-auto w-[1280px] min-h-[500px]">
      <Breadcrumb
        items={[
          {
            title: (
              <Link href={"/"}>
                <HomeOutlined />
                <span>Home</span>
              </Link>
            ),
          },
          {
            title: (
              <>
                <ProductOutlined />
                <span>Tất cả sản phẩm</span>
              </>
            ),
          },
        ]}
      />
      <div className="grid my-5 grid-cols-5">
        <div className="col-span-1">
          <Form
            onFinish={onFinish}
            initialValues={{
              categoryId: 0,
              price: 0,
              sortOrder: 1,
            }}
          >
            <Form.Item name="categoryId">
              <div>
                <h3 className=" font-semibold">Loại sản phẩm</h3>
                <Radio.Group name="categoryId" defaultValue={0}>
                  <Radio value={0}>Tất cả</Radio>
                  {options &&
                    options.map((item: any) => (
                      //@ts-ignore
                      <Radio value={item.value} key={item.value}>
                        {item?.label}
                      </Radio>
                    ))}
                </Radio.Group>
              </div>
            </Form.Item>
            <Form.Item name="price">
              <div>
                <h3 className=" font-semibold">Mức giá</h3>
                <Radio.Group defaultValue={0}>
                  <Radio value={0}>Tất cả</Radio>
                  <Radio value={1}>Dưới 500.000</Radio>
                  <Radio value={2}>500.000-1.000.000</Radio>
                  <Radio value={3}>Trên 1.000.000</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
            <Form.Item name="sortOrder">
              <div>
                <h3 className="font-semibold">Sắp xếp theo</h3>
                <Radio.Group defaultValue={1}>
                  <Radio value={1}>Tăng dần</Radio>
                  <Radio value={2}>Giảm dần</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="dashed" htmlType="submit" style={{ width: 200 }}>
                Lọc
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-4 bg-[#f4f4f4]">
            {products?.map((product: Product) => (
              <div key={product.productId}>
                <CardProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;

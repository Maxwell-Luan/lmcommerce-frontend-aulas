/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";

import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";

import { useEffect, useState } from "react";

import type { ProductDTO } from "../../../models/product";
import type { QueryParams } from "../../../models/queryParams";

import * as productService from "../../../services/product-service";
import SearchBar from "../../../components/SearchBar";
import ButtonNextPage from "../../../components/ButtonNextPage";
import DialogInfo from "../../../components/DialogInfo";

export default function ProductListing() {
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Operação com sucesso!",
  });

  const [isLastPage, setIsLastPage] = useState(false);

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        const nextPage = response.data.content;
        setProducts(products.concat(nextPage));
        setIsLastPage(response.data.last);
      });
  }, [queryParams]);

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParams({ page: 0, name: searchText });
  }

  function handleNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  function handleDeleteClick() {
    setDialogInfoData({...dialogInfoData, visible: true})
  }

  function handleDialogInfoClose(){
    setDialogInfoData({...dialogInfoData, visible: false})
  }

  return (
    <main>
      <section id="product-listing-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>
        <div className="dsc-btn-page-container">
          <div className="dsc-btn dsc-btn-white dsc-mb20">Novo</div>
        </div>

        <SearchBar onSearch={handleSearch} />

        <table className="dsc-table dsc-mb20 dsc-mt20">
          <thead>
            <tr>
              <th className="dsc-tb576">ID</th>
              <th></th>
              <th className="dsc-tb768">Preço</th>
              <th className="dsc-txt-left">Nome</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="dsc-tb576">{product.id}</td>
                <td>
                  <img
                    className="dsc-product-listing-image"
                    src={product.imgUrl}
                    alt={product.name}
                  />
                </td>
                <td className="dsc-tb768">{product.price.toFixed(2)}</td>
                <td className="dsc-txt-left">{product.name}</td>
                <td>
                  <img
                    className="dsc-product-listing-btn"
                    src={editIcon}
                    alt="Editar"
                  />
                </td>
                <td>
                  <img
                    className="dsc-product-listing-btn"
                    src={deleteIcon}
                    alt="Deletar"
                    onClick={handleDeleteClick}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLastPage && <ButtonNextPage onNextPage={handleNextPageClick} />}
      </section>
      {
      dialogInfoData.visible && 
      <DialogInfo message={dialogInfoData.message}
      onDialogClose={handleDialogInfoClose}/>
      }
    </main>
  );
}

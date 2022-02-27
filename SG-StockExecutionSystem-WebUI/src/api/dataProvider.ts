import {
  DataProvider,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  UpdateManyParams,
  DeleteParams,
  DeleteManyParams,
  GetListResult,
  GetOneResult,
  GetManyResult,
  CreateResult,
  UpdateResult,
  UpdateManyResult,
  DeleteResult,
  DeleteManyResult,
  GetManyReferenceResult,
} from "react-admin";
import { fetchAPI } from "./fetchAPI";

const baseURL: string = "http://localhost:8080/api/v1";
export const dataProvider: DataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    let response: any;
    let result: GetListResult<any>;
    let data: Stock[] | StockOrder[] = [];
    switch (resource) {
      case "stocks":
        response = await fetchAPI(
          `${baseURL}/stocks/${params.pagination.page}/${params.pagination.perPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        result = {
          data: response.body.stocks.content,
          total: response.body.total,
        };
        break;
      case "orders":
        response = await fetchAPI(
          `${baseURL}/orders/${params.pagination.page}/${params.pagination.perPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        result = {
          data: response.body.orders.content,
          total: response.body.total,
        };
        break;
      default:
        break;
    }
    return await new Promise<GetListResult<any>>((resolve) => {
      resolve(result);
    });
  },
  getOne: async (resource: string, params: GetOneParams) => {
    const response = await fetchAPI("", {});
    const result: GetOneResult<any> = {
      data: [],
    };
    return await new Promise<GetOneResult<any>>((resolve) => {
      resolve(result);
    });
  },
  getMany: async (resource: string, params: GetManyParams) => {
    const response = await fetchAPI("", {});
    const result: GetManyResult<any> = {
      data: [],
    };
    return await new Promise<GetManyResult<any>>((resolve) => {
      resolve(result);
    });
  },
  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams
  ) => {
    const response = await fetchAPI("", {});
    const result: GetManyReferenceResult<any> = {
      data: [],
      total: 1,
    };
    return await new Promise<GetManyReferenceResult<any>>((resolve) => {
      resolve(result);
    });
  },
  create: async (resource: string, params: CreateParams<any>) => {
    let response: any;
    let result: CreateResult<any>;
    switch (resource) {
      case "stocks":
        response = await fetchAPI(`${baseURL}/orders`, {
          method: "POST",
          body: JSON.stringify(params.data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        result = {
          data: response.body,
        };

        break;
      case "orders":
        //Create new order from stock resource
        response = await fetchAPI(`${baseURL}/orders`, {
          method: "POST",
          body: JSON.stringify(params.data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        result = {
          data: response.body,
        };
        break;
      default:
        break;
    }
    return await new Promise<CreateResult<any>>((resolve) => {
      resolve(result);
    });
  },
  update: async (resource: string, params: UpdateParams<any>) => {
    const response = await fetchAPI("", {});
    const result: UpdateResult<any> = {
      data: [],
    };
    return await new Promise<UpdateResult<any>>((resolve) => {
      resolve(result);
    });
  },
  updateMany: async (resource: string, params: UpdateManyParams<any>) => {
    let response: any;
    let result: UpdateManyResult;
    switch (resource) {
      case "stocks":
        result = {
          data: [],
        };
        break;
      case "orders":
        response = await fetchAPI(`${baseURL}/orders`, {
          method: "PUT",
          body: JSON.stringify(params.data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        result = {
          data: response.body,
        };
        break;

      default:
        break;
    }

    return await new Promise<UpdateManyResult>((resolve, reject) => {
      if(response.status !== 200){
        reject(`http status code: ${response.status}`);
      }else{
        resolve(result);
      }
      
    });
  },
  delete: async (resource: string, params: DeleteParams) => {
    const response = await fetchAPI("", {});
    const result: DeleteResult<any> = {
      data: [],
    };
    return await new Promise<DeleteResult<any>>((resolve) => {
      resolve(result);
    });
  },
  deleteMany: async (resource: string, params: DeleteManyParams) => {
    let response: any;
    let result: DeleteManyResult;
    switch (resource) {
      case "stocks":
        response = await fetchAPI(`${baseURL}/stocks`, {
          method: "DELETE",
          body: JSON.stringify(params.ids),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        result = {
          data: response.body,
        };
        break;
      case "orders":
        response = await fetchAPI(`${baseURL}/orders`, {
          method: "DELETE",
          body: JSON.stringify(params.ids),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        result = {
          data: response.body,
        };
        break;
      default:
        break;
    }

    return await new Promise<DeleteManyResult>((resolve) => {
      resolve(result);
    });
  },
};

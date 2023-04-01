import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Asset } from "./model/Asset";
import { Configuration } from "./model/Configuration";
import { Sparepart } from "./model/Sparepart";
import { User } from "./model/User";

@Injectable({
  providedIn: "root",
})
export class RestapiService {
  baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  AuthUser(logindata: {
    username: string;
    password: string;
  }): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users?username=${logindata.username}&password=${logindata.password}`
    );
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users/${id}`);
  }

  getAssetById(id: number): Observable<Asset[]> {
    return this.http.get<Asset[]>(`http://localhost:3000/assets/${id}`);
  }

  getConfigById(id: number) {
    return this.http.get(`http://localhost:3000/configurations/${id}`);
  }

  getSparepartById(id: number) {
    return this.http.get(`http://localhost:3000/spareparts/${id}`);
  }

  getLocationById(id: number) {
    return this.http.get(`http://localhost:3000/locations/${id}`);
  }

  getHistory() {
    return this.http.get(`http://localhost:3000/history`);
  }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`http://localhost:3000/assets`);
  }

  getSpareparts() {
    return this.http.get(`http://localhost:3000/spareparts`);
  }

  getConfigurations() {
    return this.http.get(`http://localhost:3000/configurations`);
  }

  getLocations() {
    return this.http.get(`http://localhost:3000/locations`);
  }

  postData(
    data: Asset | Sparepart | Configuration,
    type: string
  ): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(data);
    return this.http.post(`${this.baseUrl}/${type}`, body, {
      headers: headers,
    });
  }

  putData(
    data: Asset | Sparepart | Configuration,
    type: string,
    id: number
  ): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(data);
    return this.http.put(`${this.baseUrl}/${type}/${id}`, body, {
      headers: headers,
    });
  }

  deleteData(type: string, id: string | number): Observable<any> {
    const headers = { "content-type": "application/json" };
    return this.http.delete(`${this.baseUrl}/${type}/${id}`, {
      headers: headers,
    });
  }
}

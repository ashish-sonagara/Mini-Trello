import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { templateBlock } from "../interface/templateBlock.interface";

@Injectable({
    providedIn: "root"
})
export class TemplateService {
    constructor(private http: HttpClient) { }

    getTemplateData(): Observable<templateBlock[]> {
        return this.http.get<templateBlock[]>("../../assets/templateBlock.json")
    }
}
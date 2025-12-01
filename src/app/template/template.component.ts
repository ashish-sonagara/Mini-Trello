import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../services/template.service';
import { templateBlock } from '../interface/templateBlock.interface';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit{

  templates: templateBlock[] = []

  constructor(
    private templateService : TemplateService
  ){}

  ngOnInit(): void {
    this.templateService.getTemplateData().subscribe(res => {
      console.log( "response from template ts file ", res);
      this.templates = res
    })
  }
}

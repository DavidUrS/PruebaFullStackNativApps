import { Component, OnInit } from '@angular/core';
import { Courses } from './../../models/courses';
import { CoursesService } from './../../services/courses.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit {

  constructor(private courseService : CoursesService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(){
    this.courseService.getCourses().subscribe(data=>{
      this.courseService.courses = data as Courses[]
    })
  }

  saveCourses(form?: NgForm){
    this.courseService.postCourses(form.value).subscribe(res=>{
      this.getCourses();
      this.cleanForm(form);
      console.log(res)
    })

  }

  deleteCourse(id){
    this.courseService.deleteCourse(id).subscribe(res=>{
      this.getCourses();
      console.log(res)
    })
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.courseService.selectedCourse = new Courses();
    }
  }

}

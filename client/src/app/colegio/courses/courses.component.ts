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
    if(form.value._id){
      this.courseService.updateCourse(form.value).subscribe(res=>{
        this.getCourses();
        this.cleanForm(form);
        console.log(res)        
      })
    }else{
      this.courseService.postCourses(form.value).subscribe(res=>{
        this.getCourses();
        this.cleanForm(form);
        console.log(res)
      })
    }
  }

  deleteCourse(id, form?: NgForm){
    this.courseService.deleteCourse(id).subscribe(res=>{
      this.cleanForm(form);
      this.getCourses();
      console.log(res)
    })
  }

  editCourse(course){
    this.courseService.selectedCourse=course;
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.courseService.selectedCourse = new Courses();
    }
  }

}

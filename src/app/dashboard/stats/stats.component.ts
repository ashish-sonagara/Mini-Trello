import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/interface/task.interface';
import { AuthUser } from 'src/app/interface/user.interface';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, AfterViewInit {

  userdata !: AuthUser;
  taskList: Task[] = []
  statusCompleted: Task[] = [];
  statusOverdue: Task[] = [];
  statusInProgress: Task[] = [];
  chart: any;


  constructor(private taskService: TaskService, private userService: UserService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    let token = this.userService.getTokenFromSessionStorage();
    if (!token) {
      this.router.navigate(['/signIn']);
    }
    else {
      this.userdata = token
    }
    this.taskList = this.taskService.getAssignedTaskFromSessionStorage(this.userdata.email);
    // console.log("inside the stats component " , this.taskList);

    this.statusCompleted = this.taskList.filter(t => t.status === "completed")
    this.statusInProgress = this.taskList.filter(t => t.status === "inProgress")
    this.statusOverdue = this.taskList.filter(t => t.status === 'overdue')

    // console.log(this.statusCompleted);
    // console.log(this.statusInProgress);
    // console.log(this.statusOverdue);
  }

  ngAfterViewInit(): void {

    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Completed', 'In Progress', 'Overdue'],
        datasets: [{
          label: 'Task Count',
          data: [
            this.statusCompleted.length,
            this.statusInProgress.length,
            this.statusOverdue.length
          ],
          backgroundColor: ['#4caf50', '#2196f3', '#f44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            },
            max : 5
          }
        }
      }
    });
  }


}

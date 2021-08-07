# Interval-Scheduling-Greedy-Visualizer
## Live Demo
A live demo of the application is hosted on firebase and can be found under [Interval Scheduling Visualizer](https://interval-scheduling-visualizer.web.app/).
## The Algorithm
The interval/job scheduling problem tries to schedule as many compatible jobs as possible. Two jobs must not overlap in order for them to be compatible. The timeline (from 0-100) represents the time. To solve the problem, a greedy algorithm is used. Before the greedy algorithm can start adding jobs, it is necessary to sort the jobs. The way the intervals are sorted is extremely important.
### Sorting of the jobs
The jobs could be sorted according to their starttime, endtime, length and number of collisions. In order for the greedy algorithm to return the correct solution, it is necessary to sort the jobs ascending based on their endtime, otherwise the number of chosen jobs might not be maximized and the problem would not be solved correctly.
## Usage
It is possible to generate a desired amount of jobs/interval using the textfield and the generate button. Then a sorting method can be selected and the jobs can be sorted. With the "Start Greedy" Button, the greedy algorithm starts picking the jobs and will return the amount of compatible jobs that he could find (depending on sorting method, this is the maximum of compatible jobs). After the greedy algorithm is finished, it is possible to sort by a different method, to see the impact of the different sorting methods on the final solution (= number of jobs)

![IntervalSchedulerLong](https://user-images.githubusercontent.com/74874980/128607052-f6cc080d-cdd8-4416-b895-026075ccb7d4.gif)

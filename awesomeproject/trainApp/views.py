from django.shortcuts import render
from django.http import HttpResponse
import datetime
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from trainApp.models import Workout, Base_wkt, Crossfit_wkt, Exercise, Cft_complex
from trainApp.forms import WorkoutModelForm, Base_wktModelForm, Crossfit_wktModelForm, WorkoutSearchForm, ExerciseSearchForm, Cft_complexSearchForm

from trainApp.serializers import WorkoutSerializer, Base_wktSerializer, Crossfit_wktSerializer, ExerciseSerializer, Cft_complexSerializer
from rest_framework import viewsets
from django.http import HttpResponse,JsonResponse
# Create your views here.



def get_all_ex(request,pk):
    data = []
    baseEx = Base_wkt.objects.filter(name=pk).order_by('ex_number')
    crossCompl = Crossfit_wkt.objects.filter(name=pk).order_by('cmplx_number')
    for base in baseEx:
        dataEx = {
                'id': base.id,
                'name': base.exercise.name,
                'ex_number': base.ex_number,
                'sets': base.sets,
                'quantity_in_set': base.quantity_in_set,
                'measurement': base.measurement,
                'rest': base.rest
            }
        data.append(dataEx)
    for cross in crossCompl:
        dataEx = {
                'id': cross.id,
                'name': cross.crf_cmplx.name,
                'ex_number': cross.cmplx_number,
                'sets': cross.sets,
                'quantity_in_set': '',
                'measurement': '',
                'rest': ''
            }
        data.append(dataEx)    
    
        
    return JsonResponse(data, safe=False)
    
    
def get_curr_user(request):
    user = []
    if request.method == 'POST':
        user.append({'currentUser':request.user.id})
        
    return JsonResponse(request.user.id, safe=False)
    

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = Workout.objects.all()
        form  = WorkoutSearchForm(self.request.GET)
        if form.is_valid():
            queryset = queryset.filter(name__icontains=form.cleaned_data['name'])
        return queryset
    
class Base_wktViewSet(viewsets.ModelViewSet):
    queryset = Base_wkt.objects.all()
    serializer_class = Base_wktSerializer

class Crossfit_wktViewSet(viewsets.ModelViewSet):
    queryset = Crossfit_wkt.objects.all()
    serializer_class = Crossfit_wktSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = Exercise.objects.all()
        form  = ExerciseSearchForm(self.request.GET)
        if form.is_valid():
            queryset = queryset.filter(name__icontains=form.cleaned_data['name'])
        return queryset

class Cft_complexViewSet(viewsets.ModelViewSet):
    queryset = Cft_complex.objects.all()
    serializer_class = Cft_complexSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = Cft_complex.objects.all()
        form  = Cft_complexSearchForm(self.request.GET)
        if form.is_valid():
            queryset = queryset.filter(name__icontains=form.cleaned_data['name'])
        return queryset

def index(request): 
    return render(request, 'trainApp/index.html')
    


    
def catalog(request): 
    workout_list = Workout.objects.filter(for_all=1)
    return render(request, 'trainApp/catalog.html',
                    {
                        'workout_list' : workout_list
                    })
                    
def workout_detail(request, pk):
    workout = Workout.objects.get(pk=pk)
    exs = Base_wkt.objects.filter(name=workout)
    cms = Crossfit_wkt.objects.filter(name=workout)
    return render(request, 'trainApp/workout_detail.html',
                    {
                        'workout' : workout,
                        'exs': exs,
                        'cms': cms
                    })
                    
def exercises(request): 
    exercise_list = Exercise.objects.all()
    return render(request, 'trainApp/exercises.html',
                    {
                        'exercise_list' : exercise_list
                    })
def exercise_detail(request, pk):
    exercise = Exercise.objects.get(pk=pk)
    return render(request, 'trainApp/exercise_detail.html',
                    {
                        'exercise' : exercise
                    })
                    
def complexes(request): 
    complex_list = Cft_complex.objects.all()
    return render(request, 'trainApp/complexes.html',
                    {
                        'complex_list' : complex_list
                    })
def complex_detail(request, pk):
    complex = Cft_complex.objects.get(pk=pk)
    return render(request, 'trainApp/complex_detail.html',
                    {
                        'complex' : complex
                    })
                                        

@login_required
def editor(request):
    return render(request, 'trainApp/editor/editor.html')
    
@login_required
def user_wkts(request): 
    workout_list = Workout.objects.filter(user=request.user.id)
    return render(request, 'trainApp/user_wkts.html',
                    {
                        'workout_list' : workout_list
                    })
 
 
@login_required 
def schedule(request): 
    weekday = datetime.datetime.today().weekday()
    today = datetime.datetime.today()
    weekdays = {
                0: "Понедельник",
                1:  "Вторник",
                2:  "Среда",
                3:  "Четверг",
                4:  "Пятница",
                5:  "Суббота",
                6:  "Воскресенье"
                }
    
    
    week_list = {}
    workout_list = {}
    help = weekday
    for i in range(weekday, weekday + 7):
        if i == 7:
            help = 0
        key = weekdays[help]
        week_list[key] = today.strftime("%d/%m/%Y")
        workout_list[key] = Workout.objects.filter(user = request.user, data__year=today.year, data__month=today.month, data__day=today.day).order_by('data')
        today = today + datetime.timedelta(days=1)
        help = help + 1
        
    
   
    return render(request, 'trainApp/schedule.html',
                    {
                        'week_list' : week_list,
                        'workout_list' : workout_list
                    })
    

    
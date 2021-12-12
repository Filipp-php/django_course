from django.contrib import admin
from trainApp.models import Workout, Base_wkt, Crossfit_wkt, Cft_complex, Exercise


# Register your models here.
@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'data', 'user', 'for_all']
    list_filter = ('name', 'data')
    
@admin.register(Base_wkt)
class Base_wktAdmin(admin.ModelAdmin):
    list_display = ['name', 'exercise', 'ex_number', 'sets', 'quantity_in_set', 'measurement']
    list_filter = ('name',)
    
@admin.register(Crossfit_wkt)
class Crossfit_wktAdmin(admin.ModelAdmin):
    list_display = ['name', 'crf_cmplx', 'sets']
    list_filter = ('name', 'crf_cmplx', 'sets')
    
@admin.register(Cft_complex)
class Cft_complexAdmin(admin.ModelAdmin):
    list_display = ['name', 'information']
    list_filter = ('name',)
    
@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ['name', 'information']
    list_filter = ('name',)
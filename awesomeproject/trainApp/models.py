from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from easy_thumbnails.fields import ThumbnailerImageField
# Create your models here.


class Workout(models.Model):
    name = models.CharField(max_length = 255, verbose_name="Название тренировки", unique=True)
    description = models.TextField(verbose_name="Описание", null=True, blank=True)
    data = models.DateTimeField(auto_now=False, auto_now_add=False, verbose_name="Дата тренировки", null=True)
    user = models.ForeignKey(User, on_delete = models.PROTECT, verbose_name="Пользователь", null=True)
    for_all = models.BooleanField(default=1, verbose_name="Другие пользователи могут видеть эту тренировку")
    
    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = "Тренировка"
        verbose_name_plural = "Тренировки"
        
    def get_absolute_url(self):
        return reverse("workout_detail", kwargs={'pk':self.id})
       
       
class Exercise(models.Model):
    name = models.CharField(max_length = 255, verbose_name="Название упражнения")
    information = models.TextField(verbose_name="Информация")
    photo  = ThumbnailerImageField(blank=True,null=True)
    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = "Упражнение"
        verbose_name_plural = "Упражнения"
    
    def get_absolute_url(self):
        return reverse("exercise_detail", kwargs={'pk':self.id})
        
    
        
        
              
class Cft_complex(models.Model):
    name = models.CharField(max_length = 255, verbose_name="Название комплекса")
    information = models.TextField(verbose_name="Информация")
    photo = ThumbnailerImageField(blank=True,null=True)
    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = "Кроссфит комплекс"
        verbose_name_plural = "Кроссфит комплексы"
     
    
    def get_absolute_url(self):
        return reverse("complex_detail", kwargs={'pk':self.id})


class Base_wkt(models.Model):
    name = models.ForeignKey(Workout, on_delete = models.PROTECT, verbose_name="Название тренировки")
    
    exercise = models.ForeignKey(Exercise, on_delete = models.PROTECT, verbose_name="Название упражнения")
    ex_number = models.IntegerField(verbose_name="Номер упражнения")
    sets = models.IntegerField(verbose_name="Количество подходов", default = 5)
    quantity_in_set = models.IntegerField(verbose_name="Количество повторений", default = 12)
    measurements = (
        ("Q", 'раз'),
        ("S", 'секунды')
    )
    measurement = models.CharField(max_length=1, choices=measurements, verbose_name="Мера для повторений", default=measurements[0])
    rest = models.IntegerField(verbose_name="Отдых между подходами (в сек)", default = 60)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Базовая тренировка"
        verbose_name_plural = "Базовые тренировки"
        
        
class Crossfit_wkt(models.Model):
    name = models.ForeignKey(Workout, on_delete = models.PROTECT, verbose_name="Название тренировки")
    crf_cmplx = models.ForeignKey(Cft_complex, on_delete = models.PROTECT, verbose_name="Название комплекса")
    cmplx_number = models.IntegerField(verbose_name="Номер комплекса")
    sets = models.IntegerField(verbose_name="Количество подходов", default = 3)
    
    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = "Кроссфит тренировка"
        verbose_name_plural = "Кроссфит тренировки"
    
    

        


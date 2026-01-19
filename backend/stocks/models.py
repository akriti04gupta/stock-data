from django.db import models

class Stock(models.Model):
    sc_code=models.CharField(max_length=20)
    sc_name=models.CharField(max_length=100)
    open_price=models.FloatField()
    high_price=models.FloatField()
    low_price=models.FloatField()
    close_price=models.FloatField()
    trade_date = models.DateField(null=True, blank=True)
    

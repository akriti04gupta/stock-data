from django.shortcuts import render
import zipfile
import requests
import io
import pandas as pd
import datetime
from django.http import JsonResponse
from .models import Stock

def fetch_data(request):
    date_str = request.GET.get("date")

    if not date_str:
        return JsonResponse({"error": "date parameter is required"}, status=400)
    try:
        trade_date = datetime.datetime.strptime(date_str, "%d%m%y").date()
    except ValueError:
        return JsonResponse({"error": "Invalid date format"}, status=400)
    
    
    url=f"https://www.bseindia.com/download/BhavCopy/Equity/EQ{date_str}_CSV.ZIP"
    headers = {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/109.0.0.0 Safari/537.36"
                }
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        return JsonResponse(
            {"error":"Can't find the data for this date(market maybe closed or public holiday)"},
            status=404
        )
    if Stock.objects.filter(trade_date=trade_date).exists():
        return JsonResponse(
            {"message": "Data already exists for this date"}
        )

        
    zip_file=zipfile.ZipFile(io.BytesIO(response.content))
    csv_file_name=zip_file.namelist()[0]
    df=pd.read_csv(zip_file.open(csv_file_name))
    
    for index,row in df.iterrows():
        Stock.objects.create(
        sc_code=str(row["SC_CODE"]).strip(),
        sc_name=row["SC_NAME"].strip().upper(),
        open_price=float(row["OPEN"]),
        high_price=float(row["HIGH"]),
        low_price=float(row["LOW"]),
        close_price=float(row["CLOSE"]),
        trade_date=trade_date
        )

    return JsonResponse(
        {"message":"Data is succesfully saved."}
    )

def get_stocks(request):
    search = request.GET.get("search", "")
    date_str = request.GET.get("date")

    if not date_str:
        return JsonResponse({"error": "date parameter is required"}, status=400)

    try:
        trade_date = datetime.datetime.strptime(date_str, "%d%m%y").date()
    except ValueError:
        return JsonResponse({"error": "Invalid date format"}, status=400)

    stocks = Stock.objects.filter(trade_date=trade_date)

    if search:
        stocks = stocks.filter(sc_name__icontains=search.strip().upper())

    data = []
    for s in stocks:
        data.append({
            "id": s.id,
            "code": s.sc_code,
            "name": s.sc_name,
            "open": s.open_price,
            "high": s.high_price,
            "low": s.low_price,
            "close": s.close_price,
        })

    return JsonResponse(data, safe=False)

        
        
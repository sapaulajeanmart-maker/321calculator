from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return FileResponse("static/index.html")

@app.get("/api/calc")
def calculate(operation: str, a: float, b: float):
    try:
        if operation == "add":
            result = a + b
        elif operation == "subtract":
            result = a - b
        elif operation == "multiply":
            result = a * b
        elif operation == "divide":
            if b == 0:
                raise HTTPException(status_code=400, detail="Division by zero")
            result = a / b
        else:
            raise HTTPException(status_code=400, detail="Invalid operation")
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
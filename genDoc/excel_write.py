Use2003=False
if Use2003:
    from .excelXml_write import genShujubiao,getJiaoZhunFile
    EXTNAME=".xml"
else:
    from .excelPyxl_write import genShujubiao,getJiaoZhunFile
    EXTNAME=".xlsx"

from django.http import HttpResponse
from django.shortcuts import render
import os
import re
from django.http import StreamingHttpResponse
# 用来处理下载文件名中文名不显示问题
from django.utils.http import urlquote

def ftp_upload(request):
    file_list, file_path = get_file_list()
    if request.method == "GET":
        return render(request, "file.html",{"file_list": file_list})
    elif request.method == "POST":
        deleteName = request.POST.get("deleName")  # 设置了一个隐藏text表单,根据前端js将要删除的文件名发给text表单,提交获取表单内容（即要删除的文件名）
        downName = request.POST.get("downName")  # 获取下载文件的文件名
        if downName:  # 下载文件
            # file = open(file_path + downName, 'rb')
            # response = HttpResponse(file)
            # response['Content-Type'] = 'application/octet-stream'
            # response['Content-Disposition'] = 'attachment;filename=%s' %(urlquote(downName))
            # return response
            # 循环写入数据,适用于大文件的下载
            def file_iterator(file_name, chunk_size=2048):
                with open(file_name, "rb") as f:
                    while True:
                        c = f.read(chunk_size)
                        if c:
                            yield  c
                        else:
                            break
            file_name = file_path + downName
            response = StreamingHttpResponse(file_iterator(file_name))
            response['Content-Type'] = 'application/octet-stream'
            response['Content-Disposition'] = 'attachment;filename=%s' %(urlquote(downName))  # 用来解决文件中文名不显示问题
            return response

        if deleteName:
            os.remove(file_path + deleteName)  # 删除文件
            file_list, file_path = get_file_list()
            return render(request, "file.html", {"file_list": file_list})
        obj = request.FILES.get("uploadFile")  # 获取文件对象,obj.name是文件名
        if obj is None:
            return render(request, "file.html", {"file_list": file_list})
        else:
            upload_file_name = file_path + obj.name
            fd = open(upload_file_name, mode="wb")  # ftp目录下用二进制方式打开文件
            for k in obj.chunks():
                fd.write(k)  # 循环写入内容
            fd.close()
            file_list, file_path = get_file_list()
            return render(request, "file.html", {"file_list": file_list})


def get_file_list():
    '''
    用来获取文件名,文件大小
    :return: 一个文件列表,列表里面是字典,每个字典对应的是文件名和文件大小
    '''
    file_list = []
    # file_path = "/home/tarena/python3/FTP文件上传下载/mywebsiti_FTP/static/ftp/"
    file_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/static/ftp/"
    # 获取文件列表
    files = os.listdir(file_path)
    print(file_list)
    for i in files:  # 遍历文件列表获取每个文件,根据文件获取文件大小
        item = file_path + i
        file_size = round(os.path.getsize(item) / 1024 / 1024, 3)  # 获取到的文件大小为字节数,转换成MB显示
        file_type = re.findall(r"(.\w+)+", i)  # 判断文件类型,利用正则表达式找到文件“.”后面的字符串
        file_dict = {"file": i, "fileSize": file_size, "file_type":file_type}  # 将文件名和文件大小放到一个字典里
        file_list.append(file_dict)  # 将字典加入列表
    return file_list, file_path




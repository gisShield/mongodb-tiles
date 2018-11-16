from pymongo import MongoClient
import os
from bson import binary


class file2db(object):
    def __init__(self, database, setname, level):
        mongodb_url = 'localhost'
        mongodb_port = 27017
        conn = MongoClient(mongodb_url, mongodb_port)
        db = conn[database]
        self.my_set = db[setname]
        self.max_level = level

    def read_png_file(self, root_path):
        # 遍历文件形成dict
        # D:\Tomcat 8.5\webapps\HN_Layers\_alllayers
        _files = []
        if os.path.exists(root_path):
            list = os.listdir(root_path)
            for i in range(0, len(list)):
                path = os.path.join(root_path, list[i])
                if os.path.isdir(path):
                    _files.extend(self.read_png_file(path))
                if os.path.isfile(path):
                    _files.extend(path)
                    # get column
                    file_name = os.path.basename(path).split('.')[0]
                    file_type = os.path.basename(path).split('.')[1]
                    dir_path = os.path.dirname(path).split('\\')
                    # get row
                    row_name = dir_path[len(dir_path) - 1]
                    # get zoom level
                    zoom_name = dir_path[len(dir_path) - 2]
                    # insert mongodb
                    if file_type == 'png':
                        self.insert_file(zoom_name, row_name, file_name, path)
            return _files
        else:
            return None

    def insert_file(self, zoom, row, column, path):
        # 将data 存到mongo中
        level = zoom[1:]
        if int(level) <= self.max_level:
            png_list = self.my_set.find({"x": row, "y": column, "z": zoom})
            if png_list.count() == 0:
                print('zoom:%s row:%s fileName:%s path:%s ' % (zoom, row, column, path))
                file = open(path, mode='rb')
                content = binary.Binary(file.read())
                self.my_set.insert({"x": row, "y": column, "z": zoom, "img": content})
                file.close()
            else:
                print('this file is exist')
        else:
            print('this zoom greater than max level')


if __name__ == '__main__':
    file2db = file2db('png', 'layer', 13)
    file2db.read_png_file('D:\Tomcat 8.5\webapps\GG_Layers\_alllayers')

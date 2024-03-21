"""
To start the local server, add the following lines of code to your project
>>> from server import HTTPServer, HTTPHandler
>>> HOST = ('localhost', 8080)
>>> httpd = HTTPServer(HOST, HTTPHandler)
>>> httpd.serve_forever()
"""


from http.server import HTTPServer, BaseHTTPRequestHandler
from typing import Union
from io import TextIOWrapper


class HTTPHandler(BaseHTTPRequestHandler):
    def success_write(self, data: Union[TextIOWrapper, str, bytes], encoding='utf-8') -> None:
        if isinstance(data, TextIOWrapper):
            data = data.read()
        if isinstance(data, str):
            data = bytes(data, encoding)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(data)
    
    def failure_write(self, mess: Union[TextIOWrapper, str, bytes] = b'File not found', encoding='utf-8') -> None:
        if isinstance(mess, TextIOWrapper):
            mess = mess.read()
        if isinstance(mess, str):
            mess = bytes(mess, encoding)
        self.send_response(404)
        self.end_headers()
        self.wfile.write(mess)

    def do_GET(self) -> None:
        def load_assets(path: str = '.' + self.path) -> None:
            try:
                with open(path, 'r', encoding='utf-8') as file:
                    self.success_write(file)
            except OSError:
                self.failure_write()
        
        def load_page(path: str) -> None:
            try:
                with open(path, 'r', encoding='cp1251') as file:
                    self.success_write(file, encoding='cp1251')
            except OSError as exc:
                self.failure_write(f'Sorry, there was a error.\nError traceback:\n{exc.__class__.__name__}: {exc}')


        if self.path.startswith('/assets/'):
            load_assets('.' + self.path)
        else:
            load_page('./res/index.html')


if __name__ == '__main__':
    with HTTPServer(('localhost', 8888), HTTPHandler) as httpd:
        httpd.serve_forever()

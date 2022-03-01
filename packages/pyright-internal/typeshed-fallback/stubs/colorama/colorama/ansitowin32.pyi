import sys
from _typeshed import SupportsWrite
from typing import Any, Callable, Optional, Pattern, Sequence, TextIO, Union

if sys.platform == "win32":
    from .winterm import WinTerm

    winterm: WinTerm
else:
    winterm: None

class StreamWrapper:
    def __init__(self, wrapped: TextIO, converter: SupportsWrite[str]) -> None: ...
    def __getattr__(self, name: str) -> Any: ...
    def __enter__(self, *args: object, **kwargs: object) -> TextIO: ...
    def __exit__(self, *args: Any, **kwargs: Any) -> None: ...
    def write(self, text: str) -> None: ...
    def isatty(self) -> bool: ...
    @property
    def closed(self) -> bool: ...

_WinTermCall = Callable[[Optional[int], bool, bool], None]
_WinTermCallDict = dict[int, Union[tuple[_WinTermCall], tuple[_WinTermCall, int], tuple[_WinTermCall, int, bool]]]

class AnsiToWin32:
    ANSI_CSI_RE: Pattern[str] = ...
    ANSI_OSC_RE: Pattern[str] = ...
    wrapped: TextIO = ...
    autoreset: bool = ...
    stream: StreamWrapper = ...
    strip: bool = ...
    convert: bool = ...
    win32_calls: _WinTermCallDict = ...
    on_stderr: bool = ...
    def __init__(self, wrapped: TextIO, convert: bool | None = ..., strip: bool | None = ..., autoreset: bool = ...) -> None: ...
    def should_wrap(self) -> bool: ...
    def get_win32_calls(self) -> _WinTermCallDict: ...
    def write(self, text: str) -> None: ...
    def reset_all(self) -> None: ...
    def write_and_convert(self, text: str) -> None: ...
    def write_plain_text(self, text: str, start: int, end: int) -> None: ...
    def convert_ansi(self, paramstring: str, command: str) -> None: ...
    def extract_params(self, command: str, paramstring: str) -> tuple[int, ...]: ...
    def call_win32(self, command: str, params: Sequence[int]) -> None: ...
    def convert_osc(self, text: str) -> str: ...

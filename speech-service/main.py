from fastapi import FastAPI, WebSocket, UploadFile, File
from faster_whisper import WhisperModel
import tempfile
import os


app = FastAPI(
    title="Museum Guide Speech Service",
    version="1.0.0"
)


# =====================================================
# LOAD WHISPER MODEL
# =====================================================

print("Đang tải Whisper model...")

model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)

print("Whisper model đã sẵn sàng!")


# =====================================================
# HOME
# =====================================================

@app.get("/")
def home():

    return {
        "message": "Speech Service is running"
    }


# =====================================================
# WEBSOCKET TEST
# =====================================================

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()

    print("Client đã kết nối WebSocket")

    try:

        while True:

            message = await websocket.receive_text()

            print("Nhận:", message)

            await websocket.send_text(
                f"Server nhận được: {message}"
            )

    except Exception as e:

        print(
            "WebSocket disconnected:",
            e
        )


# =====================================================
# SPEECH TO TEXT
# =====================================================

@app.post("/speech-to-text")
async def speech_to_text(
    file: UploadFile = File(...)
):

    print("\n==============================")
    print("🎤 Nhận audio từ Mobile")
    print("==============================")

    print(
        "Tên file:",
        file.filename
    )

    print(
        "Content-Type:",
        file.content_type
    )


    # =================================================
    # ĐỌC AUDIO
    # =================================================

    audio_data = await file.read()

    print(
        "Kích thước audio:",
        len(audio_data),
        "bytes"
    )


    # =================================================
    # TẠO FILE TẠM
    # =================================================

    temp_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".m4a"
    )

    temp_file.write(audio_data)

    temp_file.close()


    try:

        print("🔄 Đang chuyển Speech → Text...")


        # =============================================
        # WHISPER
        # =============================================

        segments, info = model.transcribe(
            temp_file.name,
            language="vi"
        )


        # =============================================
        # GHÉP CÁC SEGMENT
        # =============================================

        text = ""

        for segment in segments:

            text += segment.text


        text = text.strip()


        print(
            "🌐 Ngôn ngữ:",
            info.language
        )

        print(
            "📝 Text:",
            text
        )


        # =============================================
        # TRẢ VỀ MOBILE
        # =============================================

        return {

            "success": True,

            "message": "Speech-to-Text thành công",

            "text": text,

            "language": info.language,

            "filename": file.filename,

            "size": len(audio_data)

        }


    except Exception as e:

        print(
            "❌ Lỗi Whisper:",
            e
        )

        return {

            "success": False,

            "message": "Speech-to-Text thất bại",

            "error": str(e)

        }


    finally:

        # =============================================
        # XÓA FILE TẠM
        # =============================================

        if os.path.exists(temp_file.name):

            os.remove(temp_file.name)
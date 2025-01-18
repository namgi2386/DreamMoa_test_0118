import cv2
import mediapipe as mp
import numpy as np

# MediaPipe Face Mesh 초기화
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# 웹캠 초기화
cap = cv2.VideoCapture(0)

def calculate_ear(landmarks, eye_indices):
    # 눈 종횡비(EAR) 계산
    points = []
    for i in eye_indices:
        point = np.array([landmarks[i].x, landmarks[i].y])
        points.append(point)
    
    # 수직 거리
    A = np.linalg.norm(points[1] - points[5])
    B = np.linalg.norm(points[2] - points[4])
    
    # 수평 거리
    C = np.linalg.norm(points[0] - points[3])
    
    # EAR 계산
    ear = (A + B) / (2.0 * C)
    return ear

def get_mouth_aspect_ratio(landmarks):
    # 입 종횡비 계산 (입이 얼마나 열렸는지)
    upper_lip = np.array([landmarks[13].x, landmarks[13].y])
    lower_lip = np.array([landmarks[14].x, landmarks[14].y])
    
    mouth_distance = np.linalg.norm(upper_lip - lower_lip)
    return mouth_distance

while cap.isOpened():
    success, image = cap.read()
    if not success:
        continue

    # MediaPipe 처리를 위해 이미지를 RGB로 변환
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            landmarks = face_landmarks.landmark
            
            # 왼쪽 눈 인덱스 (눈 주변 6개 점)
            LEFT_EYE = [362, 385, 387, 263, 373, 380]
            # 오른쪽 눈 인덱스
            RIGHT_EYE = [33, 160, 158, 133, 153, 144]
            
            # 눈 종횡비 계산
            left_ear = calculate_ear(landmarks, LEFT_EYE)
            right_ear = calculate_ear(landmarks, RIGHT_EYE)
            
            # 눈썹 위치 (예시 포인트)
            LEFT_EYEBROW = [296, 336]
            RIGHT_EYEBROW = [70, 107]
            
            # 입술 포인트 (위/아래 중앙점)
            LIPS = [13, 14]
            
            # 상태 출력
            cv2.putText(image, f'Left Eye: {left_ear:.2f}', (10, 30),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.putText(image, f'Right Eye: {right_ear:.2f}', (10, 60),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            
            # 눈 깜빡임 감지
            BLINK_THRESH = 0.2
            if left_ear < BLINK_THRESH and right_ear < BLINK_THRESH:
                cv2.putText(image, 'Blink Detected!', (10, 90),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            
            # 입 벌림 정도 감지
            mouth_ratio = get_mouth_aspect_ratio(landmarks)
            cv2.putText(image, f'Mouth: {mouth_ratio:.2f}', (10, 120),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    cv2.imshow('MediaPipe Face Mesh', image)
    if cv2.waitKey(5) & 0xFF == 27:  # ESC 키로 종료
        break

cap.release()
cv2.destroyAllWindows()
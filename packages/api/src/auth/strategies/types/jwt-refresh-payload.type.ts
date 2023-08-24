import { Session } from 'src/session/entities/session.entity';

export type JwtRefreshPayloadType = {
  sessionId: Session['id'];
  deviceId: Session['deviceId'];
  iat: number;
  exp: number;
};

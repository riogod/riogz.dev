import { Session } from 'src/session/entities/session.entity';
import { User } from '../../../users/entities/user.entity';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  deviceId: Session['deviceId'];
  iat: number;
  exp: number;
};

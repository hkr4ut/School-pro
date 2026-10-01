import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import type { SportEvent } from '../../types';
import { formatDate, getEventTypeColor } from '../../utils/helpers';

interface EventCardProps {
  event: SportEvent;
  isRegistered: boolean;
  onToggleRegister: (eventId: string) => void;
}

export default function EventCard({ event, isRegistered, onToggleRegister }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
          {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
        </span>
        <StatusBadge status={event.status} />
      </div>
      <h3 className="font-semibold text-gray-900 mb-3">{event.title}</h3>
      <div className="space-y-2 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{event.registeredStudents.length}{event.maxParticipants ? ` / ${event.maxParticipants}` : ''} registered</span>
        </div>
      </div>
      {event.status === 'upcoming' && (
        <Button
          variant={isRegistered ? 'outline' : 'primary'}
          size="sm"
          className="w-full"
          onClick={() => onToggleRegister(event.id)}
        >
          {isRegistered ? 'Cancel Registration' : 'Register Now'}
        </Button>
      )}
      {event.status === 'completed' && (
        <p className="text-xs text-gray-400 text-center">Event completed</p>
      )}
    </div>
  );
}

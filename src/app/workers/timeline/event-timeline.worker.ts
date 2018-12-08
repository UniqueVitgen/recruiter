import {Injectable} from '@angular/core';
import {BaseTimeline} from '../../classes/timeline/base-timeline';
import {NoteTimeline} from '../../classes/timeline/note-timeline';
import {InterviewTimeline} from '../../classes/timeline/interview-timeline';
import {ExperienceTimeline} from '../../classes/timeline/experience-timeline';
import {AttachmentTimeline} from '../../classes/timeline/attachment-timeline';
import {EventTimelineType} from '../../enums/event-timeline-type.enum';


@Injectable({
  providedIn: 'root'
})
export class EventTimelineWorker {

  public isInterview(baseTimeline: BaseTimeline) {
    const interview = <InterviewTimeline> baseTimeline;
    if (interview) {
      return interview.type === EventTimelineType.Interview;
    }
  }

  public isExperience(baseTimeline: BaseTimeline) {
    const experience = <ExperienceTimeline> baseTimeline;
    if (experience) {
      return experience.type === EventTimelineType.Experience;
    }
  }
  public isNote(baseTimeline: BaseTimeline) {
    const note = <NoteTimeline> baseTimeline;
    if (note) {
      return note.type === EventTimelineType.Note;
    }
  }
  public isAttachement(baseTimeline: BaseTimeline) {
    const attachment = <AttachmentTimeline> baseTimeline;
    if (attachment) {
      return attachment.type === EventTimelineType.Attachment;
    }
  }
}

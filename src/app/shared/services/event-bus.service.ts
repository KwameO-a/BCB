import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription, UnaryFunction, pipe } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

export interface EventPayloadMap {
  Foo: string;
  Bar: number;
  FooBar: {
    foo: string;
    bar: number;
  };
}

export abstract class EventMessage<TEvent extends keyof EventPayloadMap = any> {
  abstract name: TEvent;
  payload: EventPayloadMap[TEvent];

  protected constructor(payload: EventPayloadMap[TEvent]) {
    this.payload = payload;
  }
}

export class FooEvent extends EventMessage<"Foo"> {
  name = "Foo" as const;

  static createEvent(payload: string) {
    return new FooEvent(payload);
  }
}

export interface EventBusArgs {
  type: string;
  data: any;
}

export class EmitEvent {
  constructor(public name: any, public value?: any) {}
}

// this works like a communication channel
export enum Events {

  SAVE_AND_EXIT
}


@Injectable()
export class EventBusService {

  subject = new Subject<any>();

  constructor() {}

  on(event: Events, action: any): Subscription {

    return this.subject
      .pipe(
        filter((e: EmitEvent) => {
          return e.name === event;
        }),
        map((e: EmitEvent) => {
          return e.value;
        })
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.subject.next(event);
  }

}

import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ɵstringify as stringify,
} from '@angular/core';
import { Status, OkData, DataWithStatus } from '../app.interfaces';

type NullableDataWithStatus<T> = DataWithStatus<T> | null | undefined;

@Directive({
  selector: '[appIfDataOk]',
})
export class IfDataOkDirective<T> {
  private _context: AppIfDataOkContext<NullableDataWithStatus<T>> =
    new AppIfDataOkContext<NullableDataWithStatus<T>>();
  private _thenTemplateRef: TemplateRef<
    AppIfDataOkContext<NullableDataWithStatus<T>>
  > | null = null;
  private _elseTemplateRef: TemplateRef<
    AppIfDataOkContext<NullableDataWithStatus<T>>
  > | null = null;
  private _thenViewRef: EmbeddedViewRef<
    AppIfDataOkContext<NullableDataWithStatus<T>>
  > | null = null;
  private _elseViewRef: EmbeddedViewRef<
    AppIfDataOkContext<NullableDataWithStatus<T>>
  > | null = null;

  constructor(
    private _viewContainer: ViewContainerRef,
    templateRef: TemplateRef<AppIfDataOkContext<NullableDataWithStatus<T>>>
  ) {
    this._thenTemplateRef = templateRef;
  }

  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  @Input()
  set appIfDataOk(data: NullableDataWithStatus<T>) {
    this._context.$implicit = this._context.appIfDataOk = data;
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to true.
   */
  @Input()
  set appIfDataOkThen(
    templateRef: TemplateRef<AppIfDataOkContext<NullableDataWithStatus<T>>> | null
  ) {
    assertTemplate('appIfDataOkThen', templateRef);
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null; // clear previous view if any.
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to false.
   */
  @Input()
  set appIfDataOkElse(
    templateRef: TemplateRef<AppIfDataOkContext<NullableDataWithStatus<T>>> | null
  ) {
    assertTemplate('appIfDataOkElse', templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null; // clear previous view if any.
    this._updateView();
  }

  private _updateView() {
    if (this._context.$implicit?.status === Status.Ok) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainer.createEmbeddedView(
            this._thenTemplateRef,
            this._context
          );
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainer.createEmbeddedView(
            this._elseTemplateRef,
            this._context
          );
        }
      }
    }
  }

  /** @internal */
  public static appIfDataOkUseIfTypeGuard: void; // eslint-disable-line @typescript-eslint/member-ordering

  /**
   * Coerce the type (runtime check is done in _updateView)
   */
  static ngTemplateGuard_appIfDataOk<T>( // eslint-disable-line @typescript-eslint/member-ordering
    dir: IfDataOkDirective<T>,
    state: any
  ): state is OkData & T {
    return true;
  }

  /**
   * Asserts the correct type of the context for the template that `AppIfDataOk` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `AppIfDataOk` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>( // eslint-disable-line @typescript-eslint/member-ordering
    dir: IfDataOkDirective<T>,
    ctx: any
  ): ctx is AppIfDataOkContext<OkData & T> {
    return true;
  }
}

/**
 * @publicApi
 */
export class AppIfDataOkContext<T = unknown> {
  public $implicit: T = null!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  public appIfDataOk: T = null!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
}

function assertTemplate(property: string, templateRef: TemplateRef<any> | null): void {
  const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
  if (!isTemplateRefOrNull) {
    throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}

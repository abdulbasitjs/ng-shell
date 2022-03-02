import { Directive, HostListener, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[copyClipboard]',
})
export class ClipboardDirective {
  constructor(private toasterService: ToastrService) {}
  @Input('copyClipboard') text!: string;
  @HostListener('click') copyText() {
    var textArea = document.createElement('textarea');

    textArea.style.position = 'fixed';
    textArea.style.top = '-999px';
    textArea.style.left = '-999px';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    textArea.value = this.text;
    document.body.appendChild(textArea);

    textArea.select();

    try {
      const successful = document.execCommand('copy');
      this.toasterService.success('Success!', 'Copied');
    } catch (err) {
      this.toasterService.error('Unable to Copy', 'Copied');
    }
    document.body.removeChild(textArea);
  }
}

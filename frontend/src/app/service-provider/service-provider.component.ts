import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-provider',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  availableProfessions: string[] = ['Plumber', 'Cleaner', 'Electrician'];
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{6,10}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      professions: [[], Validators.required]
      
    });
  }

  onProfessionChange(event: any) {
    const professions: string[] = this.registerForm.get('professions')?.value || [];
    const selected = event.target.value;
  
    if (event.target.checked) {
      if (!professions.includes(selected)) {
        professions.push(selected);
      }
    } else {
      const index = professions.indexOf(selected);
      if (index > -1) {
        professions.splice(index, 1);
      }
    }
  
    this.registerForm.get('professions')?.setValue(professions);  // ✅ set value properly
    this.registerForm.get('professions')?.markAsTouched();        // ✅ mark as touched
  }
  
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Photo selected:', file.name);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registerForm.value.name);
      formData.append('contactNo', this.registerForm.value.contactNo);
      formData.append('address', this.registerForm.value.address);
      formData.append('city', this.registerForm.value.city);
      formData.append('description', this.registerForm.value.description);
      formData.append('password', this.registerForm.value.password);
      //formData.append('profession', this.registerForm.value.profession);
      //formData.append('professions', JSON.stringify(this.registerForm.value.professions));
      //formData.append('profession', this.registerForm.value.professions.join(','));

      // ✅ Send comma-separated professions string
    formData.append('professions', this.registerForm.value.professions.join(','));

      //this.registerForm.value.professions.forEach((prof: string) => {
      //  formData.append('profession', prof);  // ✅ This sends it as a List<String>
      //});

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('http://localhost:8080/api/providers', formData).subscribe({
        next: (response) => {
          alert('Service provider registered successfully!');
          this.registerForm.reset();
          this.selectedFile = null;
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to register provider. Try again.');
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
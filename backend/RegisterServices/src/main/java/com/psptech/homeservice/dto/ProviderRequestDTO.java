package com.psptech.homeservice.dto;

import java.util.List;

public class ProviderRequestDTO {
	private String name;
	private String contactNo;
	private String address;
	private String city;
	private String description;
	private String password;
	private String photoPath;

	public String getPhotoPath() {
		return photoPath;
	}

	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}

	private List<String> profession; // multiple professions

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<String> getProfession() {
		return profession;
	}

	public void setProfession(List<String> profession) {
		this.profession = profession;
	}
}

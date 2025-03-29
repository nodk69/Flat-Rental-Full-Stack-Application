package com.example.project.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.ArrayList;

import static com.example.project.entities.enums.Permission.*;


@Getter
@RequiredArgsConstructor
public enum Role {
    TENANT(
            Set.of(
            TENANT_CREATE,
            TENANT_READ,
            TENANT_UPDATE,
            TENANT_DELETE,
            FLAT_SEARCH,
            BOOKING_CREATE,
            BOOKING_READ,
            BOOKING_CANCEL
    )),
    OWNER(
            Set.of(
            OWNER_CREATE,
            OWNER_READ,
            OWNER_UPDATE,
            FLAT_CREATE,
            FLAT_UPDATE,
            FLAT_DELETE,
            FLAT_READ,
            BOOKING_READ,
            BOOKING_UPDATE
    )),
    ADMIN(
            Set.of(
            ADMIN_REGISTER,
            ADMIN_READ,
            ADMIN_MANAGE_USERS,
            ADMIN_MANAGE_FLATS,
            ADMIN_MANAGE_BOOKINGS,
            ADMIN_DELETE_USERS,
            REPORTS_GENERATE
    ));

    private final Set<Permission> permission;

    public List<SimpleGrantedAuthority> getAuthorities(){
        List<SimpleGrantedAuthority> permissionAuthorities = new ArrayList<>(permission
                .stream()
                .map(permission->new SimpleGrantedAuthority(permission.getPermission()))
                        .toList());

        permissionAuthorities.add((new SimpleGrantedAuthority("ROLE_"+this.name())));

        return permissionAuthorities;
    }

    @JsonValue
    public String toJson() {
        return name();
    }
}

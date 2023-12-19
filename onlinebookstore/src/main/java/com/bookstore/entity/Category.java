package com.bookstore.entity;

import java.util.HashMap;
import java.util.Map;



public enum Category {

	    BIOGRAPHS(0),
	    LOVESTORIES(1),
	    HORROR(2),
	    THRILLER(3),
	    COMIC(4),
	    SCIENCE(5),
	    HISTORY(6),
	    MATHEMATICS(7),
		FANTASY(8),
		COMPUTERSCIENCE(9),
		POLITICAL(10),
		FINANCE(11);
	

	    private int value;
	    private static Map map = new HashMap<>();

	    private Category(int value) {
	        this.value = value;
	    }

	    static {
	        for (Category category : Category.values()) {
	            map.put(category.value, category);
	        }
	    }

	    public static Category valueOf(int category) {
	        return (Category) map.get(category);
	    }

	    public int getValue() {
	        return value;
	    }
	

}
